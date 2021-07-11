import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// миддлвейр позволяющий по токену получать юзера

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // получаем токен из заколовка authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    // получаем декодированные данные из токена и передаем его req.user
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
    // продолжаем цепочку действий
    next();
  } catch (error) {
    return res.status(401).json({ message: "Пользователь не авторизован" });
  }
}
