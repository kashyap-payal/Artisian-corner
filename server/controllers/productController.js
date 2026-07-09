const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
console.log("✅ Loading productController.js");
// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    let imageUrl = "";

    if (req.file) {
      console.log("Uploading to Cloudinary...");

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "artisans-corner",
      });

      console.log("Cloudinary Result:", result.secure_url);

      imageUrl = result.secure_url;

      // Delete temporary file
      fs.unlinkSync(req.file.path);
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
      seller: req.user.id,
    });

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "seller",
      "name email"
    );

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    // Only the seller who created the product can update it
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    // Only the seller who created the product can delete it
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Add Review
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    await product.save();

    res.status(201).json({
      message: "Review Added Successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
};