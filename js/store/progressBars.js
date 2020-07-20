/**
 * ACTION TYPES
 */

const HEALTH = "HEALTH";
const HUNGER = "HUNGER";
const HAPPINESS = "HAPPINESS";
const CLEANLINESS = "CLEANLINESS";
/**
 * ACTION CREATORS
 */
export const getHealth = () => ({
  type: HEALTH,
});
export const setHappiness = (option, amount) => ({
  type: HAPPINESS,
  bar: {
    option: option,
    amount: amount,
  },
});
export const setHunger = (option, amount) => ({
  type: HUNGER,
  bar: {
    option: option,
    amount: amount,
  },
});
export const setCleanliness = (option, amount) => ({
  type: CLEANLINESS,
  bar: {
    option: option,
    amount: amount,
  },
});

/**
 * THUNK CREATORS
 */
/**
 * INITIAL STATE
 */
const initialState = {
  healthBar: 50,
  happinessBar: 50,
  hungerBar: 50,
  cleanlinessBar: 50,
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case HEALTH: {
      let health =
        state.happinessBar * 0.333 +
        state.hungerBar * 0.333 +
        state.cleanlinessBar * 0.333 + 0.1;
      return { ...state, healthBar: health };
    }
    case HAPPINESS: {
      let happiness =
        action.bar.option === "increase"
          ? state.happinessBar + action.bar.amount
          : state.happinessBar - action.bar.amount;
      if (happiness >= 100) happiness = 100;
      else if (happiness <= 0) happiness = 0;
      return { ...state, happinessBar: happiness };
    }
    case HUNGER: {
      let hunger =
        action.bar.option === "increase"
          ? state.hungerBar + action.bar.amount
          : state.hungerBar - action.bar.amount;
      if (hunger >= 100) hunger = 100;
      else if (hunger <= 0) hunger = 0;
      return { ...state, hungerBar: hunger };
    }
    case CLEANLINESS: {
      let cleanliness =
        action.bar.option === "increase"
          ? state.cleanlinessBar + action.bar.amount
          : state.cleanlinessBar - action.bar.amount;
      if (cleanliness >= 100) cleanliness = 100;
      else if (cleanliness <= 0) cleanliness = 0;
      return { ...state, cleanlinessBar: cleanliness };
    }
    default:
      return state;
  }
}
