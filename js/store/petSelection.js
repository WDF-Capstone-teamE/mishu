/**
 * ACTION TYPES
 */

const PET_KIND = "PET_KIND";
const GET_PETS = "GET_PETS";
const SELECT_PET = "SELECT_PET";
const SHOW_AR ="SHOW_AR"
/**
 * ACTION CREATORS
 */
export const getKind = (petkind) => ({
  type: PET_KIND,
  petkind,
});

export const getPets = (petsAvailable) => ({
  type: GET_PETS,
  petsAvailable,
});
export const selectPet = (pet) => ({
  type: SELECT_PET,
  pet,
});
export const showAr = () => ({
  type: SHOW_AR,
})

/**
 * THUNK CREATORS
 */

/**
 * INITIAL STATE
 */
const initialState = {
  petKind: null,
  petsAvailable: [],
  selectedPet: {},
  show:false
};
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case PET_KIND: 
      return {...state, petKind: action.petKind}
    case GET_PETS: 
      return {...state, petsAvailable: action.petsAvailable}
    case SELECT_PET: 
      return {...state, selectedPet: action.pet }
    case SHOW_AR:{
      // const show = !state.showAr;
      return { ...state, show: !state.show };
    }
    default:
      return state;
  }
}
