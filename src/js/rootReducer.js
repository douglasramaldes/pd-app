import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
import viewReducer from "./views/reducer";
import apiReducer from "./api/reducer";

const rootReducer = combineReducers({
  viewState: viewReducer,
  apiState: apiReducer
});

const store = createStore(
  rootReducer,
  devToolsEnhancer(),
  applyMiddleware(thunkMiddleware)
);

export default store;
