const express = require('express');
const router = express.Router();
const Review = require('../model/Review');

// Route to post a review
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to get reviews for a place
router.get('/reviews/:placeId', async (req, res) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId }).populate('userId', 'name');
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a review
router.delete('/reviews/:reviewId', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
