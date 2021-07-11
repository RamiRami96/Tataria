import { trackAPI } from "../api/api";

import { Dispatch } from "redux";
import { ITracks, ITrack, IAction } from "../interfaces/interfaces";

// редьюсер треков

const initialState: ITracks = {
  tracks: [],
  infoTrackMsg: "",
  trackLoading: false,
};

enum TrackActionType {
  SET_TRACKS = "SET_TRACKS",
  CREATE_TRACK = "CREATE_TRACK",
  DELETE_TRACK = "DELETE_TRACK",
  LIKE_TRACK = "LIKE_TRACK",
  UNLIKE_TRACK = "UNLIKE_TRACK",
  INFORM_TRACK = "INFORM_TRACK",
  LOAD_TRACK = "LOAD_TRACK",
}

export const trackReducer = (
  state = initialState,
  action: IAction
): ITracks => {
  switch (action.type) {
    case TrackActionType.SET_TRACKS:
      return { ...state, tracks: action.payload, infoTrackMsg: "" };
    case TrackActionType.CREATE_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
        infoTrackMsg: action.payload.message,
      };
    case TrackActionType.DELETE_TRACK:
      return {
        ...state,
        tracks: [
          ...state.tracks.filter((track) => track._id !== action.payload),
        ],
        infoTrackMsg: "",
      };

    case TrackActionType.LIKE_TRACK:
      return {
        ...state,
        tracks: [
          ...state.tracks.map((track) =>
            track._id === action.payload._id ? action.payload : track
          ),
        ],
      };

    case TrackActionType.UNLIKE_TRACK:
      return {
        ...state,
        tracks: [
          ...state.tracks.map((track) =>
            track._id === action.payload._id ? action.payload : track
          ),
        ],
      };

    case TrackActionType.LOAD_TRACK:
      return { ...state, trackLoading: action.payload };

    default:
      return state;
  }
};

const setTracksAction = (tracks: object) => ({
  type: TrackActionType.SET_TRACKS,
  payload: tracks,
});

const createTrackAction = (data: ITrack) => ({
  type: TrackActionType.CREATE_TRACK,
  payload: data,
});

const likeTrackAction = (data: ITrack) => ({
  type: TrackActionType.LIKE_TRACK,
  payload: data,
});

const unLikeTrackAction = (data: ITrack) => ({
  type: TrackActionType.UNLIKE_TRACK,
  payload: data,
});

const deleteTrackAction = (id: number) => ({
  type: TrackActionType.DELETE_TRACK,
  payload: id,
});

const informTrack = (data: string) => ({
  type: TrackActionType.INFORM_TRACK,
  payload: data,
});

const loadData = (isLoading: boolean) => ({
  type: TrackActionType.LOAD_TRACK,
  payload: isLoading,
});

export const setTracks = () => async (dispatch: Dispatch<IAction>) => {
  try {
    const { data } = await trackAPI.getTracks();
    dispatch(setTracksAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const createTrack =
  (formData: ITrack) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch(loadData(true));
      const { data } = await trackAPI.createTrack(formData);
      dispatch(createTrackAction(data));
      dispatch(informTrack(data.message));
      dispatch(loadData(false));
    } catch (error) {
      console.log(error);
    }
  };

export const likeTrack =
  (id: number) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch(loadData(true));
      const { data } = await trackAPI.likeTrack(id);
      dispatch(likeTrackAction(data));
      dispatch(loadData(false));
    } catch (error) {
      console.log(error);
    }
  };

export const unLikeTrack =
  (id: number) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch(loadData(true));
      const { data } = await trackAPI.unLikeTrack(id);
      dispatch(unLikeTrackAction(data));
      dispatch(loadData(false));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteTrack =
  (id: number) => async (dispatch: Dispatch<IAction>) => {
    try {
      const { data } = await trackAPI.deleteTrack(id);
      dispatch(deleteTrackAction(data));
    } catch (error) {
      console.log(error);
    }
  };
