import React, { Component } from 'react'
import { connect } from 'react-redux';

class Stuff extends Component {
    state = {
        myFaveNumber: 1
    }
    handleIncrement = () => {
        this.setState({ myFaveNumber: this.state.myFaveNumber + 1})
      }
      handleDecrement = () => {
        this.setState({ myFaveNumber: this.state.myFaveNumber - 1})
      }
    render() {
        return (
            <div>
                <h1>myFaveNumber: {this.props.random}</h1>
            </div>
        )
    }
}

// can name counter whatever as long as it matches the props name above
function mapStateToProps({ counter }){
    return {random: counter.counter};
};

export default connect(mapStateToProps, null)(Stuff);