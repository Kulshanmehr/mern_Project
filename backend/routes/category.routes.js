import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  CreateCategory,
  getAllCategories,
  getCategoryData,
} from "../controllers/category.controller.js";
const router = Router();

router.post(
  "/addCategory",
  upload.fields([
    { name: "category_thumb_image", maxCount: 1 },
    { name: "categoryBanner", maxCount: 1 },
  ]),
  CreateCategory,
);
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryProducts/:id", getCategoryData);

export default router;
