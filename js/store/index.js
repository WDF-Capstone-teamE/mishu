import { createStore, combineReducers } from "redux";
import pet from './petSelection'

const reducer = combineReducers({pet});

const store = createStore(reducer);

export default store;