import Router from "express";
const router = Router();
import authRouter from "./authRouter";
import trackRouter from "./trackRouter";
import userRouter from "./userRouter";

router.use("/auth", authRouter);
router.use("/tracks", trackRouter);
router.use("/user", userRouter);

export default router;
