import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const baseUploadPath = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = "others";

    if (
      file.fieldname === "productImages" ||
      file.fieldname === "product_thumb_image" ||
      file.fieldname === "productBanner"
    ) {
      folderName = "product";
    } else if (
      file.fieldname === "category_thumb_image" ||
      file.fieldname === "categoryBanner"
    ) {
      folderName = "category";
    }

    const uploadPath = path.join(baseUploadPath, folderName);
    ensureDirExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });
