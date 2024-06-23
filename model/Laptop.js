// models/Laptop.js

const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  processor: { type: String, required: true },
  ram: { type: String, required: true },
  storage: { type: String, required: true },
  screenSize: { type: String, required: true },
  operatingSystem: { type: String, required: true },
  weight: { type: String, required: true },
  batteryLife: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  monthlyPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  year: { type: Number, required: true },
  availability: { type: Boolean, required: true, default: true },
});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
