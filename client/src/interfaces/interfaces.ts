// интерфейсы приложения

export interface IUser {
  id?: number;
  email?: string;
  nickname?: string;
  password?: string;
  avatar?: string;
  tracks?: any;
}

export interface IAuth {
  user: IUser;
  isAuth: boolean;
  infoAuthMsg: string;
  authLoading: boolean;
}

export interface IPlayer {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IRegisterForm {
  email: string;
  nickname: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ITrack {
  _id: number;
  artist: string;
  title: string;
  poster: object;
  audio: object;
  user: number;
  likes: [];
  date: Date;
}

export interface ITracks {
  tracks: ITrack[];
  infoTrackMsg: string;
  trackLoading: boolean;
}

export interface IMessages {
  messages: IMessage[];
  messageLoading: boolean;
}

export interface IMessage {
  _id: any;
  avatar?: string;
  nick?: string;
  message: string;
}

export interface IFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
