import { IAction, IMessages } from "../interfaces/interfaces";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";

const initialState: IMessages = {
  messages: [],
  messageLoading: false,
};

enum MessageActionType {
  SET_MESSAGES = "SET_MESSAGES",
  ADD_MESSAGE = "ADD_MESSAGE",
}

type ThunkType = ThunkAction<void, RootState, unknown, IAction>;

export const messageReducer = (
  state = initialState,
  action: IAction
): IMessages => {
  switch (action.type) {
    case MessageActionType.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case MessageActionType.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

const setMessagesAction = (data: []) => ({
  type: MessageActionType.SET_MESSAGES,
  payload: data,
});

const addMessageAction = (data: []) => ({
  type: MessageActionType.ADD_MESSAGE,
  payload: data,
});

export const setMessages =
  (socket: any): ThunkType =>
  (dispatch: Dispatch<IAction>) => {
    socket.on("messages", (res: any) => {
      dispatch(setMessagesAction(res));
    });
  };

export const addMessage =
  (socket: any, data: any): ThunkType =>
  (dispatch: Dispatch<IAction>) => {
    socket.emit("message", data);

    dispatch(addMessageAction(data));
  };
