import { createStore, combineReducers } from "redux";
import pet from './petSelection'
import animation from './petAnimation'

const reducer = combineReducers({pet, animation});

const store = createStore(reducer);

export default store;