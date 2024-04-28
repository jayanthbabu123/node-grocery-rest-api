const express = require('express');
const router = express.Router();
const Place = require('../model/Place');

// Route to get all places in India
router.get('/', async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(200).send(places);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to post an array of places
router.post('/', async (req, res) => {
    try {
      const places = await Place.insertMany(req.body); // req.body should be an array of objects
      res.status(201).send(places);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  

// Route to get places by city
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const places = await Place.find({ city: city });
    if (places.length === 0) {
      return res.status(404).send({ message: 'No places found in the specified city' });
    }
    res.status(200).send(places);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const places = await Place.deleteMany();
    res.status(200).send({ message: 'All places deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
