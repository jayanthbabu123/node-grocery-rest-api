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
    console.log(req.body, 'places');
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

// Route to update a place
router.put('/:placeId', async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.placeId, req.body, { new: true });
    if (!place) {
      return res.status(404).send({ message: 'Place not found' });
    }
    res.status(200).send(place);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a place
router.delete('/:placeId', async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.placeId);
    if (!place) {
      return res.status(404).send({ message: 'Place not found' });
    }
    res.status(200).send({ message: 'Place deleted successfully' });
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
