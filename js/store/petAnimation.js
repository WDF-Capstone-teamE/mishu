/**
 * ACTION TYPES
 */
const GET_ANIMATION = "GET_PETS";
const SELECT_ANIMATION = "SELECT_PET";
const PET = 'PET'


/**
 * ACTION CREATORS
 */
export const getAnimation = () => ({
  type: GET_ANIMATION,
});
export const selectAnimation = () => ({
  type: SELECT_ANIMATION,
  // numString,
});
export const getPet = (modelNum) => ({
  type: PET,
  modelNum
})


/**
 * INITIAL STATE
 */
const initialState = {
  modelNum: 0,
  currentAnimation: "01",
};


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANIMATION: 
      return { ...state }
    // this is the logic for setting an animation, in order to connect the buttons to an animation
    // simply send in the string that corresponds to that animation on the model
    case SELECT_ANIMATION: {
      if (state.currentAnimation === "01") {
        state.currentAnimation = "02";
      } else if (state.currentAnimation === "02") {
        state.currentAnimation = "01";
      }
      return { ...state }; 
    }
    case PET:
      return {...state, modelNum: action.modelNum}   
    default:
      return state;
  }
}