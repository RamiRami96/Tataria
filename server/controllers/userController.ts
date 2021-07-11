import { Request, Response } from "express";
import User from "../models/User";

// контроллер подбзователя

class UserController {
  // метод загрузки аватара
  async uploadAvatar(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.user.id });

      // к свойству avatar приписываю свойство originalname у загруженного файла
      // таким образом получаю название загруженной картинки

      user.avatar = req.file!.originalname;

      await user.save();

      res.json({ message: "Фотография была загружена" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
