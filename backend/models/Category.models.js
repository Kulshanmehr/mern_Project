import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    category_thumb_image: {
      type: String,
      required: true,
    },
    categoryBanner: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    categorySlug: {
      type: String,
      // required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre("save", function (next) {
  if (this.isModified("categoryName")) {
    this.categorySlug = this.categoryName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
  }
  next();
});

export const Category = mongoose.model("Category", categorySchema);
