import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
import { trackReducer } from "./trackReducer";
import { playerReducer } from "./playerReducer";
import { messageReducer } from "./messageReducer";

// хранилище состояния приложения

const rootReducer = combineReducers({
  authReducer,
  trackReducer,
  playerReducer,
  messageReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
