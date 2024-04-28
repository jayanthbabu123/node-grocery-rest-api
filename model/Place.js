const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, // Make it false if you don't want to make image URL mandatory
  },
  price: {
    type: Number,
    required: true,
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
