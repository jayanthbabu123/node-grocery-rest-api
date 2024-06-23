const express = require("express");
const router = express.Router();
const Product = require("../model/Products");

// Route to get all products
router.get("/", async (req, res) => {
  console.log(req.body, 'products');
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to get products by category
router.get("category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    if (products.length === 0) {
      return res
        .status(404)
        .send({ message: "No products found in the specified category" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to post a product

// Route to post a product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to post multiple products
router.post("/bulk", async (req, res) => {
  console.log('new product',req.body);
  try {
    const products = await Product.insertMany(req.body);
    res.status(201).send(products);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to get a product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a product
router.delete("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to update a product
router.put("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// patch route should be used for partial updates based on the field I am sending and not all the fields
router.patch("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to delete all products
router.delete("/", async (req, res) => {
  try {
    const products = await Product.deleteMany();
    res.status(200).send({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
