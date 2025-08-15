const express = require("express");
const product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const products = new product({
      name,
      price,
      description,
      owner: req.user._id,
    });
    await products.save();

    res
      .status(201)
      .json({ message: "Product added successfully", success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getProduct = async (req, res) => {
  try {
    const userProduct = await product
      .find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    //   .populate("owner", "name email");  used for populate user data

    res.status(200).json({
      status: 1,
      message: "Product list fetched successfully",
      data: userProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await product.deleteOne({
      _id: id,
      owner: req.user._id,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        status: 0,
        message: "Product not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Product deleted successfully",
      data: deleteResult,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Internal server error",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const response = await product.updateOne(
      { _id: id, owner: req.user._id }, // filter
      { $set: { name, price, description } } // update
    );

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      success: false,
      error,
    });
  }
};

module.exports = { addProduct, getProduct, deleteProduct, updateProduct };
