import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  file: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema, 'Images');
export default Image;
