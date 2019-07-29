import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../actions";

class Signup extends Component {
  onSubmit = formProps => {
      console.log(formProps);
      this.props.signup(formProps, () => {
        this.props.history.push('/counter');
      });
  };
  
  render() {
    //   console.log(this.props);
    // handleSubmit given to us by redux form tools links to onSubmit
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {/* semantic html */}
        <fieldset>
          <label>Email</label>
          {/* takes 4 parameters - name, type, component, (autoComplete)*/}
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          {/* takes 4 parameters - name, type, component, (autoComplete)*/}
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <button>Signup</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    { signup }
  ),
  reduxForm({ form: "signup" })(Signup)
);
