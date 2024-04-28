const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Place'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
