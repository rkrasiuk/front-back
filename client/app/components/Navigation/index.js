import React, {Component} from 'react';
import {NavLink} from 'react-router';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <h1>Dream Team</h1>
        <div className="links">
          <NavLink to="/goods">Goods</NavLink>
          <NavLink to="/competitors">Competitors</NavLink>
        </div>
      </div>
    );
  }
}

export default Navigation;
