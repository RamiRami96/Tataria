import express from "express";
import Track from "../models/Track";
import User from "../models/User";
import fs from "fs";
import path from "path";

class TrackController {
  async getTracks(req: express.Request, res: express.Response) {
    try {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    } catch (error) {
      res.status(404).json("Треки не найдены");
    }
  }

  async getTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const track = await Track.findById(id);
      res.status(200).json(track);
    } catch (error) {}
    res.status(404).json("Трек не найден");
  }

  async createTrack(req: express.Request, res: express.Response) {
    try {
      const { title } = req.body;

      const reqFiles = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      let files = Object.assign(reqFiles);

      const user = await User.findOne({ _id: req.user.id });

      const newTrack = new Track({
        artist: user.nickname,
        title,
        poster: files[0].originalname,
        audio: files[1].originalname,
        user: user.id,
      });

      user.tracks.push(newTrack);

      await user.save();
      await newTrack.save();

      res.json({ message: "Трек был создан" });
    } catch (error) {
      res.status(404).json("Не удалось загрузить трек");
    }
  }

  async likeTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: req.user.id });

      const track = await Track.findById(id);

      track.likes.push(user._id);

      await track.save();

      res.json(track);
    } catch (error) {
      res.status(404).json("Не удалось поставить лайк");
    }
  }

  async unLikeTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: req.user.id });

      const track = await Track.findById(id);

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

  async deleteTrack(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: req.user.id });

      const track = await Track.findById(id);

      user.tracks.filter((t: any) => t.toString() !== track._id.toString());

      await user.save();

      await Track.findByIdAndDelete(id);

      fs.unlinkSync(path.join(__dirname, `../public/audio/${track.audio}`));

      fs.unlinkSync(path.join(__dirname, `../public/image/${track.poster}`));

      res.json({ message: "Трек был удален" });
    } catch (error) {
      res.status(404).json("Не удалось удалить трек");
    }
  }
}

export default new TrackController();
