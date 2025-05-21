import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: true,
      unique: true, // Assuming you want product names to be unique
    },
    productDescription: {
      type: String,
      required: true,
    },
    stocks: {
      type: Number,
      required: true,
      min: 0, // Optional: prevents negative stock values
    },
    shortDescription: {
      type: String,
      required: true,
    },
    thumb_image: {
      type: String,
      required: true,
    },
    productBanner: {
      type: String,
      required: true, // Was missing in your original code
    },
    productImages: [
      {
        type: String,
      },
    ],
    productPrice: {
      type: Number, // Changed to Number (recommended for prices)
      required: true,
      min: 0,
    },
    productCost: {
      type: Number, // Changed to Number
      required: true,
      min: 0,
    },
    productHeading: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
