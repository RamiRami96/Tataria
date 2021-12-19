import { authAPI, userAPI } from "../api/api";
import {
  IAuth,
  IAction,
  IRegisterForm,
  ILoginForm,
  IUser,
} from "../interfaces/interfaces";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";

// редьюсер авторизации

const initialState: IAuth = {
  user: {},
  isAuth: false,
  infoAuthMsg: "",
  authLoading: false,
};

enum AuthActionType {
  SET_USER_DATA = "SET_USER_DATA",
  INFORM_USER_DATA = "INFORM_USER_DATA",
  LOAD_USER_DATA = "LOAD_USER_DATA",
  LOGOUT = "LOGOUT",
}

type ThunkType = ThunkAction<void, RootState, unknown, IAction>;

export const authReducer = (state = initialState, action: IAction): IAuth => {
  switch (action.type) {
    case AuthActionType.SET_USER_DATA:
      return { ...state, user: action.payload, isAuth: true, infoAuthMsg: "" };
    case AuthActionType.LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: {}, isAuth: false, infoAuthMsg: "" };
    case AuthActionType.LOAD_USER_DATA:
      return { ...state, authLoading: action.payload };
    case AuthActionType.INFORM_USER_DATA:
      return { ...state, infoAuthMsg: action.payload };

    default:
      return state;
  }
};

export const setUser = (user: IUser) => ({
  type: AuthActionType.SET_USER_DATA,
  payload: user,
});

export const loadData = (isLoading: boolean) => ({
  type: AuthActionType.LOAD_USER_DATA,
  payload: isLoading,
});

export const logoutUser = () => ({
  type: AuthActionType.LOGOUT,
});

export const informUser = (data: string) => ({
  type: AuthActionType.INFORM_USER_DATA,
  payload: data,
});

export const registerUser =
  (regData: IRegisterForm): ThunkType =>
  async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch(loadData(true));
      const { data } = await authAPI.register(regData);
      dispatch(informUser(data.message));
      dispatch(loadData(false));
    } catch (error) {
      console.log(error);
    }
  };

export const loginUser =
  (logData: ILoginForm): ThunkType =>
  async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch(loadData(true));
      const { data } = await authAPI.login(logData);

      if (data.token) {
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);
      } else if (data.message) {
        dispatch(informUser(data.message));
      }
      dispatch(loadData(false));
    } catch (error) {
      console.log(error);
    }
  };

export const authUser =
  (): ThunkType => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch(loadData(true));
      const { data } = await authAPI.auth();
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
      dispatch(loadData(false));
    } catch (error) {
      console.log(error);
      dispatch(loadData(false));
    }
  };

export const refreshUser =
  (): ThunkType => async (dispatch: Dispatch<IAction>) => {
    try {
      const { data } = await authAPI.auth();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    }
  };

export const uploadAvatar = async (avatar: object) => {
  await userAPI.uploadAvatar(avatar);
};
