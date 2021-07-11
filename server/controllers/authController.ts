import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// контроллер авторизации

class AuthController {
  // метод регистрации
  async register(req: Request, res: Response) {
    try {
      // проверка нет ли ошибок в валидации
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //получаем почту, ник и пароль из формы на клиенте

      const { email, nickname, password } = req.body;

      // находим юзера по почте и нику

      const emailCandidate = await User.findOne({ email });
      const nicknameCandidate = await User.findOne({ nickname });

      // проверка существует ли такой пользователь

      if (emailCandidate) {
        return res.json({
          message: "Пользователь с такой почтой уже существует",
        });
      }

      if (nicknameCandidate) {
        return res.json({
          message: "Пользователь с таким никнеймом уже существует",
        });
      }

      // хэширование пароля

      const hashPassword = await bcrypt.hash(password, 8);

      // создание и сохранение нового пользователя

      const user = new User({
        email,
        nickname,
        password: hashPassword,
      });

      await user.save();

      return res.json({ message: "Пользователь был создан" });
    } catch (error) {
      console.log(error);
    }
  }
  // метод логинизации
  async login(req: Request, res: Response) {
    try {
      //получаем почту и пароль из формы на клиенте

      const { email, password } = req.body;

      // находим юзера по почте

      const user = await User.findOne({ email });

      // проверка на существование юзера

      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }

      //сравнение и проверка введенного пароля и пароля пользователя

      let comparePasswords = bcrypt.compareSync(password, user!.password);

      if (!comparePasswords) {
        return res.json({ message: "Указан неверный пароль" });
      }

      // создание токена

      const token = jwt.sign({ id: user!.id }, config.SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          tracks: user.tracks,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  //метод проверки зарегистрирован ли пользователь
  async auth(req: Request, res: Response) {
    try {
      // находим юзера по id
      const user = await User.findOne({ _id: req.user.id });
      // создание токена
      const token = jwt.sign({ id: user!.id }, config.SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          tracks: user.tracks,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
