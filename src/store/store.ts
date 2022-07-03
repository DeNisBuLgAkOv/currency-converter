import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducer";
import thunkMiddleware from 'redux-thunk'

export const store = createStore(reducer,applyMiddleware(thunkMiddleware))

export default store