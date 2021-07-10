import Router from "express";
const router = Router();
import UserController from "../controllers/userController";
import multer from "multer";
import path from "path";
import authMiddleware from "../middleware/authMiddleware";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, path.join(__dirname, "../public/avatar"));
    } else {
      console.log("Данный тип не поддерживается");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage }).single("avatar");

router.post("/", authMiddleware, upload, UserController.uploadAvatar);

export default router;
