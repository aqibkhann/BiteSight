import mongoose from 'mongoose';

const userdataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dailyCalorie: {
    type: Number,
    default: 2000,
  },
  dailyLogs: {
    type: Map,
    of: new mongoose.Schema({
      totalCalorie: {
        type: Number,
        required: true,
        default: 0,
      },
      totalCarbohydrates: {
        type: Number,
        required: true,
        default: 0,
      },
      totalProtein: {
        type: Number,
        required: true,
        default: 0,
      },
      totalFats: {
        type: Number,
        required: true,
        default: 0,
      },
      totalSugar: {
        type: Number,
        required: true,
        default: 0,
      },
      totalFiber: {
        type: Number,
        required: true,
        default: 0,
      },
    }),
    default: {},
  },
  images: [{
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    calorie: {
      type: Number,
      required: true,
      default: 0,
    },
    carbohydrates: {
      type: Number,
      required: true,
      default: 0,
    },
    protein: {
      type: Number,
      required: true,
      default: 0,
    },
    fats: {
      type: Number,
      required: true,
      default: 0,
    },
    sugar: {
      type: Number,
      required: true,
      default: 0,
    },
    fiber: {
      type: Number,
      required: true,
      default: 0,
    },
  }],
});

// Index images by uploadedAt to support sorting by recency
userdataSchema.index({ 'images.uploadedAt': -1 });
const UserData = mongoose.model('UserData', userdataSchema, 'UserData');
export default UserData;
