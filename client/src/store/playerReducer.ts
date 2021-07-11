import { IAction, ITrack } from "../interfaces/interfaces";

// редьюсер проигрывателя

enum PlayerActionType {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
}

const initialState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
};

export const playerReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case PlayerActionType.PAUSE:
      return { ...state, pause: true };
    case PlayerActionType.PLAY:
      return { ...state, pause: false };
    case PlayerActionType.SET_ACTIVE:
      return { ...state, active: action.payload, duration: 0, currentTime: 0 };
    case PlayerActionType.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionType.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionType.SET_VOLUME:
      return { ...state, volume: action.payload };
    default:
      return state;
  }
};

export const pauseTrack = () => ({ type: PlayerActionType.PAUSE });

export const playTrack = () => ({ type: PlayerActionType.PLAY });

export const setActiveTrack = (payload: ITrack) => ({
  type: PlayerActionType.SET_ACTIVE,
  payload,
});

export const setCurrentTime = (payload: number) => ({
  type: PlayerActionType.SET_CURRENT_TIME,
  payload,
});

export const setDuration = (payload: number) => ({
  type: PlayerActionType.SET_DURATION,
  payload,
});

export const setVolume = (payload: number) => ({
  type: PlayerActionType.SET_VOLUME,
  payload,
});
