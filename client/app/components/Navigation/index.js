import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavigationBar extends Component {
  render() {
    return (
      <div className="navigation">
        <h3 className="navigation-title">Dream Team</h3>
        <nav className="links">
          <NavLink activeStyle={{color: '#7887E8'}} className="nav-link" to="/goods">Goods</NavLink>
          <NavLink activeStyle={{color: '#7887E8'}} className="nav-link" to="/competitors">Competitors</NavLink>
          <NavLink activeStyle={{color: '#7887E8'}} className="nav-link" to="/report">Report</NavLink>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
