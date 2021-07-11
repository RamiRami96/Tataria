import Router from "express";
const router = Router();
import TrackController from "../controllers/tracksController";
import multer from "multer";
import path from "path";
import authMiddleware from "../middleware/authMiddleware";

// Настройка загрузка постера и аудио

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, path.join(__dirname, "../public/image"));
    } else if (file.mimetype === "audio/mpeg") {
      cb(null, path.join(__dirname, "../public/audio"));
    } else {
      console.log("Данный тип не поддерживается");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// присваем к переменной upload настройки загрузки
// теперь это наш миддлвейр позволяющий загружать аудио и постер
let upload = multer({ storage: storage }).any();

// роуты треков
// у некоторых роутов я передаю authmiddleware, чтобы иметь доступ к пользователю

router.get("/", TrackController.getTracks);
router.get("/:id", TrackController.getTrack);
router.post("/", authMiddleware, upload, TrackController.createTrack);
router.post("/:id/like", authMiddleware, TrackController.likeTrack);
router.post("/:id/unlike", authMiddleware, TrackController.unLikeTrack);
router.delete("/:id", authMiddleware, TrackController.deleteTrack);

export default router;
