import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import './index.scss';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h3 className="navigation-title">Dream Team</h3>
        <div className="edit-panel">
          <Button variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button variant="fab" color="primary" aria-label="Edit" className="edit-button">
            <Icon>edit_icon</Icon>
          </Button>
        </div>
      </div>
    );
  }
}

export default Header;
