import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "../actions/types";

const INITIAL_STATE = {
  counter: 0
};

// if state is not passed in as a parameter, pass in initial state
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      // ... takes and spreads out the state
      return { ...state, counter: state.counter + 1 };
    case DECREMENT_COUNTER:
      // ... takes and spreads out the state
      return { ...state, counter: state.counter - 1 };
    default:
        return state;
  }
}
