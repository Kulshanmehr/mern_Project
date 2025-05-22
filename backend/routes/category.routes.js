import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  CreateCategory,
  getAllCategories,
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

export default router;
