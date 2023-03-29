import * as tf from '@tensorflow/tfjs';
import cocoSsd from '@tensorflow-models/coco-ssd';
import { createCanvas, Image } from 'canvas';
import axios from 'axios';
import sharp from 'sharp';

let modelPromise;

async function initializeModel() {
  try {
    await tf.ready();
    modelPromise = cocoSsd.load();
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

initializeModel();

async function loadModelAndDetect(base64Image) {
  try {
    // Convert base64 string to buffer
    const imageBuffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Resize and convert image to JPEG using sharp
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 640 }) // Resize the image if needed
      .jpeg()
      .toBuffer();

    // Create an Image object and load the resized image
    const img = new Image();
    img.src = resizedImageBuffer;

    // Create a canvas and draw the resized image on it
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Load TensorFlow.js and Coco-SSD model
    await tf.ready();
    const model = await modelPromise;

    // Detect objects in the image using Coco-SSD
    const predictions = await model.detect(canvas);
    console.log('Predictions:', predictions);

    if (predictions.length === 0) {
      throw new Error('No objects detected in the image.');
    }

    // Get nutrition information for the first detected object
    const nutrients = await getNutrients(predictions[0]?.class);
    return nutrients;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw error to handle it upstream
  }
}

async function getNutrients(foodItem) {
  try {
    const apiKey = 'ke9Pa9cVloFqCQPoNlDZGBd1Ocaf92uGX0cQBVcI';

    // Search for the food item using USDA FDC API
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        api_key: apiKey,
        query: foodItem,
        pageSize: 1
      }
    });

    if (response.data.foods.length === 0) {
      throw new Error('Food item not found.');
    }

    // Get detailed nutrient information for the found food item
    const food = response.data.foods[0];
    const nutrientResponse = await axios.get(`https://api.nal.usda.gov/fdc/v1/food/${food.fdcId}`, {
      params: {
        api_key: apiKey
      }
    });

    const nutrientsObj = nutrientResponse.data.labelNutrients || {};
    return {
      calorie: nutrientsObj.calories?.value || 0,
      protein: nutrientsObj.protein?.value || 0,
      carbohydrates: nutrientsObj.carbohydrates?.value || 0,
      fats: nutrientsObj.fat?.value || 0,
      sugars: nutrientsObj.sugars?.value || 0,
      fiber: nutrientsObj.fiber?.value || 0
    };
  } catch (error) {
    console.error('Error fetching nutrient data:', error);
    throw new Error('Error fetching nutrient data.');
  }
}

export { loadModelAndDetect };
