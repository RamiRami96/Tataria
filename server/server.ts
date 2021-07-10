import express from "express";
import cors from "cors";
import { config } from "./config/config";
import router from "./routes/index";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Message from "./models/Message";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

class NodeServer {
  private app;
  private io: any;
  public server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
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

  private async chat_app() {
    this.io.on("connection", (socket: Socket) => {
      Message.find().then((messages: any) => socket.emit("messages", messages));

      socket.on("message", ({ avatar, nick, message }) => {
        this.io.emit("message", { avatar, nick, message });
        const newMsg = new Message({ avatar, nick, message });
        newMsg.save();
      });
    });
  }

  private route_app() {
    this.app.use("/api", router);
  }

  private async connect_db() {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  public start() {
    this.server.listen(config.PORT, () => {
      console.log(`Server is streaming on  port: ${config.PORT}`);
    });
  }

  utils() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(__dirname + "/public"));
  }
}

new NodeServer();
