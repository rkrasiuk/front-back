import React, {Component} from 'react';
import MaterialModal from '@material-ui/core/Modal';

import './index.scss';

class Modal extends Component {
  render() {
    const {open, handleClose, children} = this.props;

    return (
      <MaterialModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal-container"
        open={open}
        onClose={handleClose}
      >
        <div className="modal">
          {children}
        </div>
      </MaterialModal>
    );
  }
}

export default Modal;
