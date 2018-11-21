import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {Box, Competition, Report} from 'icons';

class NavigationBar extends Component {
  static navLinkProps = {
    activeStyle: {color: '#7887E8'},
    className: 'nav-link',
  };

  render() {
    const {activeLink} = this.props;

    return (
      <div className="navigation">
        <nav className="links">
          <NavLink {...NavigationBar.navLinkProps} to="/goods">
            <Box active={activeLink === '/goods'} />
            {' Goods'}
          </NavLink>
          <NavLink {...NavigationBar.navLinkProps} to="/competitors">
            <Competition active={activeLink === '/competitors'} />
            {' Competitors'}
          </NavLink>
          <NavLink {...NavigationBar.navLinkProps} to="/report">
            <Report active={activeLink === '/report'} />
            {' Report'}
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
