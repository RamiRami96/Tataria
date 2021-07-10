import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, nickname, password } = req.body;

      const emailCandidate = await User.findOne({ email });
      const nicknameCandidate = await User.findOne({ nickname });

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

      const hashPassword = await bcrypt.hash(password, 8);

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
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }

      let comparePasswords = bcrypt.compareSync(password, user!.password);

      if (!comparePasswords) {
        return res.json({ message: "Указан неверный пароль" });
      }

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

  async auth(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.user.id });
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
