import axios from "axios";
import { ILoginForm, IRegisterForm, ITrack } from "../interfaces/interfaces";

// запросы к  API приложения

// url приложения

export const mainUrl = "http://localhost:5000";

// url апишки

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// запросы на регистрацию,логинизаию и проверку залогинен ли пользователь

export const authAPI = {
  register(data: IRegisterForm) {
    return instance.post("/auth/register", data);
  },
  login(data: ILoginForm) {
    return instance.post("/auth/login", data);
  },
  auth() {
    return instance.get("/auth/auth", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
};

//запросы на получкение, создание, лайк и удаление треков

export const trackAPI = {
  getTracks() {
    return instance.get("/tracks");
  },
  createTrack(data: ITrack) {
    return instance.post("/tracks", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "multipart/form-data",
      },
    });
  },
  likeTrack(id: number) {
    return instance.post(`/tracks/${id}/like`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  unLikeTrack(id: number) {
    return instance.post(`/tracks/${id}/unlike`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  deleteTrack(id: number) {
    return instance.delete(`/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

// запрос на загрузку аватара

export const userAPI = {
  uploadAvatar(avatar: object) {
    return instance.post(`/user`, avatar, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "multipart/form-data",
      },
    });
  },
};
