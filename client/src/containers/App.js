import React, { Component } from "react";

export default ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
};

const App = props => {
  return (
    <div>
      {props.children}
    </div>
  )
}