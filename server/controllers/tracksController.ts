import express from "express";
import Track from "../models/Track";
import User from "../models/User";
import fs from "fs";
import path from "path";

//контроллеров треков

class TrackController {
  //метод получения всех треков
  async getTracks(req: express.Request, res: express.Response) {
    try {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    } catch (error) {
      res.status(404).json("Треки не найдены");
    }
  }
  //метод получения трека по id
  async getTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const track = await Track.findById(id);
      res.status(200).json(track);
    } catch (error) {}
    res.status(404).json("Трек не найден");
  }
  //метод созадания трека
  async createTrack(req: express.Request, res: express.Response) {
    try {
      // получаем название трека из формы на клиенте
      const { title } = req.body;
      // так как тип не предусматривает получение свойств из массива req.files,
      // мне пришлось сделать свой тип и из константы reqFiles сделать новый массив files
      const reqFiles = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      let files = Object.assign(reqFiles);

      const user = await User.findOne({ _id: req.user.id });

      // создаем новый трек

      const newTrack = new Track({
        artist: user.nickname,
        title,
        poster: files[0].originalname,
        audio: files[1].originalname,
        user: user.id,
      });

      // добавляем к пользователю в массив tracks новый трек

      user.tracks.push(newTrack);

      await user.save();
      await newTrack.save();

      res.json({ message: "Трек был создан" });
    } catch (error) {
      res.status(404).json("Не удалось загрузить трек");
    }
  }
  //метод лайка трейка
  async likeTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: req.user.id });

      const track = await Track.findById(id);

      // добавляю id юзера в массив массив likes

      track.likes.push(user._id);

      await track.save();

      res.json(track);
    } catch (error) {
      res.status(404).json("Не удалось поставить лайк");
    }
  }
  //метод отмены лайка трека
  async unLikeTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: req.user.id });

      const track = await Track.findById(id);

      // удаляю id юзера в массив массив likes

      track.likes.splice(
        track.likes.findIndex(function (i: any) {
          return i.toString() === user._id.toString();
        }),
        1
      );

      await track.save();

      res.json(track);
    } catch (error) {
      res.status(404).json("Не удалось поставить лайк");
    }
  }
  //метод удаления трека
  async deleteTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: req.user.id });

      const track = await Track.findById(id);

      // удаляю id трека из массива tracks у пользователя

      user.tracks.filter((t: any) => t.toString() !== track._id.toString());

      await user.save();

      // удаляю сам трек по id

      await Track.findByIdAndDelete(id);

      // удаляю аудио и изображение из папок

      fs.unlinkSync(path.join(__dirname, `../public/audio/${track.audio}`));

      fs.unlinkSync(path.join(__dirname, `../public/image/${track.poster}`));

      res.json({ message: "Трек был удален" });
    } catch (error) {
      res.status(404).json("Не удалось удалить трек");
    }
  }
}

export default new TrackController();
