const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Register User
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id }, // Payload to include in the JWT
      process.env.JWT_SECRET, // The secret key for signing the JWT
      { expiresIn: '1h' } // Optional expiration time for the token
    );

    // If the password matches, return the user (excluding the password) and the token
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    // Send back the user info (without password) and the JWT token
    res.send({ user: userWithoutPassword, token });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
