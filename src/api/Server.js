import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import User from './UserModel.js';
import UserData from './UserDataModel.js';
import Image from './ImageModel.js';
import { loadModelAndDetect } from '../model/Detection.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const addr = process.env.SERVER_ADDRESS;

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const uri = process.env.MONGODB_URI;

// Middleware to verify JWT token
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies['bitesight-user'];

    if (!token) {
      return res.status(400).json({ message: 'No active user found' });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(403).clearCookie('bitesight-user').json({ message: `Invalid user ${decodedToken.userId}` });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return res.status(403).clearCookie('bitesight-user').json({ message: 'JWT verification failed' });
  }
};

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');

    // Route to check authentication status
    app.get('/api/auth', verifyJWT, async (req, res) => {
      try {
        res.status(200).json({ authenticated: true, user: req.user });
      } catch (error) {
        console.error('Error checking authentication status:', error);
        res.status(403).json({ authenticated: false, message: 'Server error' });
      }
    });

    // Route to register a new user
    app.post('/api/register', async (req, res) => {
      const { name, email, password, gender, age } = req.body;
    
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, auth: hashedPassword, gender, age });
        await newUser.save();

        const newUserData = new UserData({
          userId: newUser._id,
          dailyCalorie: 2000, 
          dailyLogs: new Map(), 
          images: [], 
        });
        await newUserData.save();

        console.log(`User ${newUser._id} registered with the service.`);
        res.status(200).json({ message: 'User registered successfully', user: newUser });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
      }
    });

    // Route to handle user login
    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.auth);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('bitesight-user', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', maxAge: 3600000 });
        console.log(`User ${user._id} has logged in.`);
        res.status(200).json({ message: 'Login successful', user: user._id });
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(403).json({ message: 'Server error' });
      }
    });

    // Route to handle user logout
    app.post('/api/logout', verifyJWT, async (req, res) => {
      try {
        res.clearCookie('bitesight-user').sendStatus(200);
        console.log(`User ${req.user._id} has been logged out`);
      } catch (error) {
        console.error('Error logging out:', error);
        res.sendStatus(400);
      }
    });

    // Route to handle image upload
    app.post('/api/uploadImage', verifyJWT, async (req, res) => {
      try {
        const userId = req.user._id;
        const { capturedImage } = req.body;
    
        if (!capturedImage) {
          return res.status(400).json({ message: 'No captured image data found' });
        }

        const base64Image = capturedImage.replace(/^data:image\/\w+;base64,/, '');
        const detectionResult = await loadModelAndDetect(base64Image);
        
        if (!detectionResult) {
          console.error(`Error processing image for user ${userId}`);
          return res.status(500).json({ message: 'Error processing image' });
        }
    
        const imageData = Buffer.from(base64Image, 'base64');
        const newImage = new Image({
          file: imageData,
          contentType: 'image/jpeg',
        });

        const savedImage = await newImage.save();
        let userData = await UserData.findOne({ userId });
        if (!userData) {
          userData = new UserData({
            userId,
            dailyCalorie: 2000,
            dailyLogs: new Map(),
            images: [],
          });
        }
    
        const currentDate = new Date().toISOString().split('T')[0];
        if (!userData.dailyLogs.has(currentDate)) {
          userData.dailyLogs.set(currentDate, {
            totalCalorie: 0,
            totalCarbohydrates: 0,
            totalProtein: 0,
            totalFats: 0,
            totalSugar: 0,
            totalFiber: 0,
          });
        }
    
        const roundedCalorie = Math.round((detectionResult.calorie || 0) * 100) / 100;
        const roundedCarbohydrates = Math.round((detectionResult.carbohydrates || 0) * 100) / 100;
        const roundedProtein = Math.round((detectionResult.protein || 0) * 100) / 100;
        const roundedFats = Math.round((detectionResult.fats || 0) * 100) / 100;
        const roundedSugar = Math.round((detectionResult.sugars || 0) * 100) / 100;
        const roundedFiber = Math.round((detectionResult.fiber || 0) * 100) / 100;
    
        userData.dailyLogs.get(currentDate).totalCalorie += roundedCalorie;
        userData.dailyLogs.get(currentDate).totalCarbohydrates += roundedCarbohydrates;
        userData.dailyLogs.get(currentDate).totalProtein += roundedProtein;
        userData.dailyLogs.get(currentDate).totalFats += roundedFats;
        userData.dailyLogs.get(currentDate).totalSugar += roundedSugar;
        userData.dailyLogs.get(currentDate).totalFiber += roundedFiber;

        userData.images.push({
          uid: savedImage._id,
          calorie: roundedCalorie,
          carbohydrates: roundedCarbohydrates,
          protein: roundedProtein,
          fats: roundedFats,
          sugar: roundedSugar,
          fiber: roundedFiber,
          uploadedAt: new Date(),
        });
    
        await userData.save();
        console.log(`${userId} uploaded an image ${savedImage._id}`);
        res.status(200).json({ message: 'User data updated with image successfully', userData });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image' });
      }
    });
    
    // image loader api
    app.get('/api/user/images', verifyJWT, async (req, res) => {
      try {
        const userId = req.user._id;
        const userData = await UserData.findOne({ userId });
        if (!userData) {
          return res.status(404).json({ error: 'User not found' });
        }

        const imageDetails = await Promise.all(
          userData.images.map(async (image) => {
            try {
              const img = await Image.findById(image.uid);
              if (!img) {
                throw new Error('Image not found');
              }

              const base64 = `data:${img.contentType};base64,${img.file.toString('base64')}`;
              return {
                uid: image.uid,
                calorie: image.calorie,
                carbohydrates: image.carbohydrates,
                protein: image.protein,
                fats: image.fats,
                sugar: image.sugar,
                base64, 
                uploadedAt: image.uploadedAt,
              };
            } catch (error) {
              console.error('Error fetching image:', error);
              return null;
            }
          })
        );

        const validImageDetails = imageDetails.filter((image) => image !== null);
        res.json(validImageDetails);
      } catch (err) {
        console.error('Error fetching user images:', err);
        res.status(500).json({ error: 'Server error' });
      }
    });

    app.get('/api/userData', verifyJWT, async (req, res) => {
      try {
        const userId = req.user._id;
        const userData = await UserData.findOne({ userId });
        if (!userData) {
          return res.status(404).json({ error: 'User data not found' });
        }
        res.json(userData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    });

    // delete entry
    app.delete('/api/deleteEntry/:uid', verifyJWT, async (req, res) => {
      const { uid } = req.params;
      const userId = req.user._id;
    
      try {
        const image = await Image.findByIdAndDelete(uid);
        if (!image) {
          return res.status(404).json({ message: 'Image not found' });
        }

        let userData = await UserData.findOne({ userId });
        if (!userData) {
          return res.status(404).json({ message: 'User data not found' });
        }

        const imageIndex = userData.images.findIndex((img) => img.uid.toString() === uid);
        if (imageIndex === -1) {
          return res.status(404).json({ message: 'Image not found in user data' });
        }
    
        const deletedImage = userData.images.splice(imageIndex, 1)[0];
        const currentDate = new Date().toISOString().split('T')[0];
        const dailyLog = userData.dailyLogs.get(currentDate);

        if (dailyLog) {
          dailyLog.totalCalorie = Math.round((dailyLog.totalCalorie - deletedImage.calorie) * 100) / 100;
          dailyLog.totalCarbohydrates = Math.round((dailyLog.totalCarbohydrates - deletedImage.carbohydrates) * 100) / 100;
          dailyLog.totalProtein = Math.round((dailyLog.totalProtein - deletedImage.protein) * 100) / 100;
          dailyLog.totalFats = Math.round((dailyLog.totalFats - deletedImage.fats) * 100) / 100;
          dailyLog.totalSugar = Math.round((dailyLog.totalSugar - deletedImage.sugar) * 100) / 100;
          dailyLog.totalFiber = Math.round((dailyLog.totalFiber - deletedImage.fiber) * 100) / 100;
        }

        await userData.save();
        console.log(`User ${userId} deleted file ${uid}`);
        res.status(200).json({ message: 'Image deleted successfully', userData });
      } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Error deleting image' });
      }
    });
    
    // loader api
    app.get('/api/load', verifyJWT, async (req, res) => {
      try {
        const userId = req.user._id;    
        let userData = await UserData.findOne({ userId });
        if (!userData) {
          return res.status(404).json({ error: 'User data not found' });
        }
        const currentDate = new Date().toISOString().split('T')[0];
        if (!userData.dailyLogs.has(currentDate)) {
          if (userData.images.length > 0) {
            userData.images = [];
            await userData.save();
            res.status(200).json({ message: 'Images array cleared for new date' });
          } else {
            res.status(200).json({ message: 'Images array is empty, no action needed' });
          }
        } else {
          res.status(200).json({ message: 'Same date, no action needed' });
        }
      } catch (err) {
        console.error('Error checking new date and clearing images array:', err);
        res.status(500).clearCookie('bitesight-user').json({ error: 'Server error' });
      }
    });

    app.listen(port, addr, () => {
      console.log(`Server is running on ${addr}:${port}`);
    });

  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

