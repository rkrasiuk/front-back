import React, {Component} from 'react';

import './index.scss';

class Header extends Component {
  render() {
    const {children} = this.props;

    return (
      <div className="header">
        <h3 className="navigation-title">Dream Team</h3>
        <div className="edit-panel">
          {children}
        </div>
      </div>
    );
  }
}

export default Header;
