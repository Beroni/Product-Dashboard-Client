import { createStore, applyMiddleware } from "redux";
import { IAuthState } from "./modules/auth/types";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules/rootReducer";
import CreateSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";

export interface IState {
  auth: IAuthState;
}

const sagaMiddleware = CreateSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
