import { Category } from "../models/Category.models.js";

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

export { CreateCategory, getAllCategories };
