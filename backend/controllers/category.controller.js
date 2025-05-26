import { Category } from "../models/Category.models.js";
import Product from "../models/product.model.js";
const fs = require("fs");
const path = require("path");

const CreateCategory = async function (req, res) {
  try {
    const { categoryName, description, shortDescription, status } = req.body;

    // Check if a category with the same name exists
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({
        status: false,
        message: "Category already exists",
      });
    }

    // Get uploaded files
    const thumbImage = req?.files?.category_thumb_image?.[0];
    const categoryBanner = req?.files?.categoryBanner?.[0];

    // Create category (slug will be auto-generated in the model)
    const category = new Category({
      categoryName,
      shortDescription,
      description,
      status,
      category_thumb_image: thumbImage?.filename || null,
      categoryBanner: categoryBanner?.filename || null,
    });

    await category.save(); // Triggers pre-save middleware

    return res.status(201).json({
      status: true,
      message: "Category added successfully",
      Category: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
const fs = require("fs");
const path = require("path");

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const { categoryName, description, shortDescription, status } = req.body;

    // Find the existing category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    // Handle file uploads
    const newThumb = req?.files?.category_thumb_image?.[0];
    const newBanner = req?.files?.categoryBanner?.[0];

    // Paths to delete old images if new ones are uploaded
    const oldThumbPath = path.join(
      __dirname,
      "..",
      "uploads",
      "category",
      category.category_thumb_image,
    );
    const oldBannerPath = path.join(
      __dirname,
      "..",
      "uploads",
      "category",
      category.categoryBanner,
    );

    // Update fields
    category.categoryName = categoryName || category.categoryName;
    category.description = description || category.description;
    category.shortDescription = shortDescription || category.shortDescription;
    category.status = status !== undefined ? status : category.status;

    // Update and delete old thumb image if new one is uploaded
    if (newThumb) {
      if (fs.existsSync(oldThumbPath)) fs.unlinkSync(oldThumbPath);
      category.category_thumb_image = newThumb.filename;
    }

    // Update and delete old banner image if new one is uploaded
    if (newBanner) {
      if (fs.existsSync(oldBannerPath)) fs.unlinkSync(oldBannerPath);
      category.categoryBanner = newBanner.filename;
    }

    await category.save();

    return res.status(200).json({
      status: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      status: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

const getAllCategories = async function (req, res) {
  try {
    const CategoryList = await Category.find();
    return res.status(200).json({
      status: true,
      message: "Category Fetched Successfully",
      categories: CategoryList,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error in Category Fetching...",
    });
  }
};

const getCategoryData = async function (req, res) {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    // console.log(category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({
      productCategory_id: categoryId,
    });

    return res.json({
      category,
      products,
    });
  } catch (error) {
    console.error("Error fetching category with products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteCategoryData = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const categoryData = await Category.findById(categoryId);

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    const bannerPath = path.join(
      __dirname,
      "..",
      "uploads",
      "category",
      categoryData.categoryBanner,
    );
    const thumbPath = path.join(
      __dirname,
      "..",
      "uploads",
      "category",
      categoryData.category_thumb_image,
    );

    // Delete files if they exist
    [bannerPath, thumbPath].forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Category.findByIdAndDelete(categoryId);

    return res
      .status(200)
      .json({ message: "Category and images deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  CreateCategory,
  getAllCategories,
  getCategoryData,
  deleteCategoryData,
};
