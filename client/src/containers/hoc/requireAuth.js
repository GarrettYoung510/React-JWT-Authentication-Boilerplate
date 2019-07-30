import React, { Component } from "react";
import { connect } from "react-redux";

// call the parameter childcomponent
export default ChildComponent => {
  // inherits everything from component and then adds whatever is in {}
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      // every single prop that this child component has will be passed to child component
      return <ChildComponent {...this.props} />;
    }
  }

  // pulling out the auth state
  function mapStateToProps({ auth }) {
    return { auth: auth.authenticated };
  }

//   gives the auth state to other pages when we wrap that whole component into requireAuth()
  return connect(
    mapStateToProps,
    null
  )(ComposedComponent);
};
