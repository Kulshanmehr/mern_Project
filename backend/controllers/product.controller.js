import Product from "../models/product.model.js";

const AddProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      stocks,
      shortDescription,
      productPrice,
      productCost,
      productHeading,
      productCategory,
    } = req.body;

    console.log(req.files);

    // Check if product already exists
    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists",
        status: false,
      });
    }

    // Extract uploaded files
    const thumb_image = req?.files?.thumb_image?.[0];
    const productBanner = req?.files?.productBanner?.[0];
    const productImages = req?.files?.productImages || [];

    // Validate required images
    if (!thumb_image) {
      return res.status(400).json({
        status: false,
        message: "Thumb Image is required",
      });
    }

    if (!productBanner) {
      return res.status(400).json({
        status: false,
        message: "Product Banner is required",
      });
    }

    // Save product
    const newProduct = await Product.create({
      productName,
      productDescription,
      productHeading,
      stocks,
      shortDescription,
      productPrice,
      productCost,
      productCategory,
      thumb_image: thumb_image.filename,
      productBanner: productBanner.filename,
      productImages: productImages.map((img) => img.filename),
    });

    return res.status(201).json({
      status: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getAllProducts = async (req, res) => {
  const Products = await Product.find();

  return res.status(200).json({
    status: true,
    Products,
  });
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    return res.status(200).json({ status: true, product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export { AddProduct, getAllProducts, getProductById };
