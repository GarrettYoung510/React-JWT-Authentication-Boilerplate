import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  AUTH_USER,
  AUTH_ERROR
} from "./types";
import axios from "axios";
// cannot make asynchronus requests here like axios/api calls, must output an object can do below
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  }
};

// function that takes another function that uses dispatch async and await way
export const signup = (formProps, callback) => async dispatch => {
        // this is how we make api calls with formProps {email, password}
        try {
            const res = await axios.post("/api/auth/signup", formProps);
            //   res.data.token is pulled from res.data this is used in auth.js
            dispatch({ type: AUTH_USER, payload: res.data.token });
            localStorage.setItem('token', res.data.token);
            callback();
          } catch (e) {
            dispatch({ type: AUTH_ERROR, payload: "Email in use" });
          }
};