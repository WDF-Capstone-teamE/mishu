import { createStore, combineReducers } from "redux";
import pet from './petSelection'
import petAnimation from './petAnimation'

const reducer = combineReducers({pet, petAnimation});

const store = createStore(reducer);

export default store;