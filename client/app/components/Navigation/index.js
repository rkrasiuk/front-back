import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavigationBar extends Component {
  static navLinkProps = {
    activeStyle: {color: '#7887E8'},
    className: 'nav-link',
  };

  render() {
    return (
      <div className="navigation">
        <h3 className="navigation-title">Dream Team</h3>
        <nav className="links">
          <NavLink {...NavigationBar.navLinkProps} to="/goods">Goods</NavLink>
          <NavLink {...NavigationBar.navLinkProps} to="/competitors">Competitors</NavLink>
          <NavLink {...NavigationBar.navLinkProps} to="/report">Report</NavLink>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
