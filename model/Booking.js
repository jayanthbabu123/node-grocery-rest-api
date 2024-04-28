const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  placeDetails: {
    name: String,
    city: String,
    state: String,
    description: String,
    imageUrl: String
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
