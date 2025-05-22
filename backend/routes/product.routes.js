import { Router } from "express";
import {
  AddProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ isWorking: true });
});

router.post(
  "/addProduct",
  upload.fields([
    { name: "product_thumb_image", maxCount: 1 },
    { name: "productBanner", maxCount: 1 },
  ]),
  AddProduct,
);

router.get("/getAllProducts", getAllProducts);
router.get("/productDetail/:id", getProductById);
export default router;
