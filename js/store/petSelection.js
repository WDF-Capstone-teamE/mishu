/**
 * ACTION TYPES
 */

import { Alert } from "react-native";

const GET_PET = "GET_PET";
const SELECT_PET = "SELECT_PET";
const SHOW_AR ="SHOW_AR"
const CHOSE_PET = "CHOSE_PET"
/**
 * ACTION CREATORS
 */
export const getPet = (petChosen) => ({
  type: GET_PETS,
  petChosen,
});
export const selectPet = (pet) => ({
  type: SELECT_PET,
  pet,
});
export const showAr = () => ({
  type: SHOW_AR,
})
export const chosePet = () => ({
  type: CHOSE_PET,
})

/**
 * THUNK CREATORS
 */

/**
 * INITIAL STATE
 */
const initialState = {
  petChosen: null,
  petsAvailable: [],
  selectedPet: {},
  show:false,
  chosen: false
};
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PET: 
      return {...state, petChosen: action.petChosen}
    case SELECT_PET: {
      Alert.alert('Message received! Your chosen pet is on it\'s way to be saved to your local storage ... eventually');
      return {...state, selectedPet: action.pet }
    }
    case SHOW_AR:{
      // const show = !state.showAr;
      return { ...state, show: !state.show };
    }
    case CHOSE_PET:{
      // const show = !state.showAr;
      return { ...state, chosen: true };
    }
    default:
      return state;
  }
}
