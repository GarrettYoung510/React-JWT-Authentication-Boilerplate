import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import counter from "./counter";
import auth from "./auth";

// this is giving us back an object:
// anything that has to do with the counter state, we want counter reducer in charge of that state
// form reducer, counter reducer, every piece of state we have, we need to create a reducer for managing
// that state
export default combineReducers({
  auth,
  form,
  counter
});
