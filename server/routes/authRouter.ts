import Router from "express";
const router = Router();
import authController from "../controllers/authController";
const { check } = require("express-validator");
import authMiddleware from "../middleware/authMiddleware";

router.post(
  "/register",
  [
    check("email", "Почта введена неверно").isEmail(),
    check("password", "Пароль должен состоять из не менее 6 символов").isLength(
      { min: 6 }
    ),
  ],
  authController.register
);
router.post("/login", authController.login);
router.get("/auth", authMiddleware, authController.auth);

export default router;
