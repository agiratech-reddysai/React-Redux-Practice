import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component {
  render() {
    if(!this.props.user) {
      return(<h3>Click on User....</h3>);
    }
    return (
        <div>
          <h2>{this.props.user.name}</h2>
          <h3>{this.props.user.age}</h3>
          <h3>{this.props.user.description}</h3>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.activeUser
  };
}

export default connect(mapStateToProps)(UserDetail);