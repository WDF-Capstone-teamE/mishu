/**
 * ACTION TYPES
 */
const GET_ANIMATION = "GET_PETS";
const SELECT_ANIMATION = "SELECT_PET";


/**
 * ACTION CREATORS
 */
export const getAnimation = () => ({
  type: GET_ANIMATION,
});
export const selectAnimation = (animId, interruptible) => ({
  type: SELECT_ANIMATION,
  animId,
  interruptible,
});


/**
 * INITIAL STATE
 */
const initialState = {
  modelNum: 0,
  currentAnimation: "01",  // 01 is our idle anim
  interruptible: true,
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
      if (state.currentAnimation === action.animId) {
        state.currentAnimation = "01";
        state.interruptible = true;
      }

      else state.currentAnimation = action.animId

      action.interruptible ? state.interruptible = action.interruptible : state.interruptible = true
      
      return { ...state }; 
    }    
    default:
      return state;
  }
}