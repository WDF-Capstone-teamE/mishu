/**
 * ACTION TYPES
 */

const PET_KIND = "PET_KIND";
const GET_PETS = "GET_PETS";
const SELECT_PET = "SELECT_PET";
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
    default:
      return state;
  }
}
