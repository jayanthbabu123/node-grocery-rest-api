const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking");
const Place = require("../model/Place");

// Route to book a place
router.post("/bookPlace", async (req, res) => {
  try {
    const { name, city, state, description, imageUrl } = await Place.findById(
      req.body.placeId
    );
    // Assuming the place details are sent in the request body
    const booking = new Booking({
      userId: req.body.userId,
      placeDetails: {
        name,
        city,
        state,
        description,
        imageUrl,
      },
      numberOfPeople: req.body.numberOfPeople,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to get my bookings
router.get("/myBookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a booking
router.delete("/deleteBooking/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
