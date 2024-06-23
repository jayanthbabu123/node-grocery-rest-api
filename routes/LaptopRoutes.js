// routes/LaptopRoutes.js

const express = require('express');
const router = express.Router();
const Laptop = require('../model/Laptop');

// Route to get all laptops
router.get('/', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single laptop by ID
router.get('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ message: 'Cannot find laptop' });
    }
    res.json(laptop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new laptop

router.post('/', async (req, res) => {
  const laptop = new Laptop({
    brand: req.body.brand,
    model: req.body.model,
    processor: req.body.processor,
    ram: req.body.ram,
    storage: req.body.storage,
    screenSize: req.body.screenSize,
    operatingSystem: req.body.operatingSystem,
    weight: req.body.weight,
    batteryLife: req.body.batteryLife,
    pricePerDay: req.body.pricePerDay,
    monthlyPrice: req.body.monthlyPrice,
    discount: req.body.discount,
    year: req.body.year,
    availability: req.body.availability
  });

  try {
    const newLaptop = await laptop.save();
    res.status(201).json(newLaptop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create multiple laptops
router.post('/multiple', async (req, res) => {
  try {
    const laptops = await Laptop.insertMany(req.body);
    res.status(201).json(laptops);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ message: 'Cannot find laptop' });
    }
    laptop.brand = req.body.brand;
    laptop.model = req.body.model;
    laptop.processor = req.body.processor;
    laptop.ram = req.body.ram;
    laptop.storage = req.body.storage;
    laptop.screenSize = req.body.screenSize;
    laptop.operatingSystem = req.body.operatingSystem;
    laptop.weight = req.body.weight;
    laptop.batteryLife = req.body.batteryLife;
    laptop.pricePerDay = req.body.pricePerDay;
    laptop.monthlyPrice = req.body.monthlyPrice;
    laptop.discount = req.body.discount;
    laptop.year = req.body.year;
    laptop.availability = req.body.availability;
    const updatedLaptop = await laptop.save();
    res.json(updatedLaptop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Route to delete a laptop by ID
router.delete('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ message: 'Cannot find laptop' });
    }
    await laptop.delete();
    res.json({ message: 'Laptop deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
