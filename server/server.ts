import express from "express";
import cors from "cors";
import { config } from "./config/config";
import router from "./routes/index";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Message from "./models/Message";

//прописываю тип req.user, как любой

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

//Класс, где запускается сервер и где все подключается

class NodeServer {
  private app;
  private io: any;
  public server;

  constructor() {
    //создание сервера
    this.app = express();
    this.server = createServer(this.app);
    // подключение io (вебсокеты)
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.chat_app();
    this.utils();
    this.route_app();
    this.connect_db();
    this.start();
  }

  //метод чата

  private async chat_app() {
    this.io.on("connection", (socket: Socket) => {
      // вывод сообщений
      Message.find().then((messages: any) => socket.emit("messages", messages));
      // создание сообщения
      socket.on("message", ({ avatar, nick, message }) => {
        this.io.emit("message", { avatar, nick, message });
        const newMsg = new Message({ avatar, nick, message });
        newMsg.save();
      });
    });
  }
  //метод подключения роутов
  private route_app() {
    this.app.use("/api", router);
  }

  //метод подключения к БД

  private async connect_db() {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  // метод запуска сервера

  public start() {
    this.server.listen(config.PORT, () => {
      console.log(`Server is streaming on  port: ${config.PORT}`);
    });
  }

  // метод, где производится обход политики cors, чтения форм
  // и устанавливается доступ к чтению статичных файлов в папке public

  utils() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(__dirname + "/public"));
  }
}

new NodeServer();
