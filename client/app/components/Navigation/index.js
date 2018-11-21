import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {Box} from 'icons';

class NavigationBar extends Component {
  static navLinkProps = {
    activeStyle: {color: '#7887E8'},
    className: 'nav-link',
  };

  render() {
    return (
      <div className="navigation">
        <nav className="links">
          <Box />
          <NavLink {...NavigationBar.navLinkProps} to="/goods">Goods</NavLink>
          <NavLink {...NavigationBar.navLinkProps} to="/competitors">Competitors</NavLink>
          <NavLink {...NavigationBar.navLinkProps} to="/report">Report</NavLink>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
