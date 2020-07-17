import { createStore, combineReducers } from "redux";
import pet from './petSelection'
import petAnimation from './petAnimation'
import progressBars from './progressBars'

const reducer = combineReducers({pet, petAnimation, progressBars});

const store = createStore(reducer);

export default store;