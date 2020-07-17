/**
 * ACTION TYPES
 */

const HEALTH = "HEALTH";
const HUNGER = "HUNGER";
const HAPPINESS ="HAPPINESS"
const CLEANLINESS = "CLEANLINESS"
/**
 * ACTION CREATORS
 */
export const setHealth = (option, amount) => ({
  type: HEALTH,
  bar: {
    option: option,
    amount: amount
  }
});
export const setHappiness = (option, amount) => ({
  type: HAPPINESS,
  bar: {
    option: option,
    amount: amount
  }
});
export const setHunger = (option,amount) => ({
  type: HUNGER,
  bar: {
    option: option,
    amount: amount
  }
})
export const setCleanliness = (option,amount) => ({
  type: CLEANLINESS,
  bar: {
    option: option,
    amount: amount
  }
})

/**
 * THUNK CREATORS
 */
const initialState = {
  healthBar:50,
  happinessBar:50,
  hungerBar:50,
  cleanlinessBar:50
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case typeName:
    return { ...state, ...payload }

  default:
    return state
  }
}
