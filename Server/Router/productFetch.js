import express from "express";
import Product from "../schema/product.js";

const productRouter = express.Router();

// Fetch all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});


// Fetch unique categories and brands
productRouter.get("/filters", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const brands = await Product.distinct("brand");

    res.status(200).json({ categories, brands });
  } catch (error) {
    res.status(500).json({ message: "Error fetching filters", error });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

export default productRouter;
