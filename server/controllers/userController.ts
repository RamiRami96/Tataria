import { Request, Response } from "express";
import User from "../models/User";

class UserController {
  async uploadAvatar(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.user.id });

      user.avatar = req.file!.originalname;

      await user.save();

      res.json({ message: "Фотография была загружена" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
