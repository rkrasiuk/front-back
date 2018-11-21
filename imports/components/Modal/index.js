import React, {Component} from 'react';
import MaterialModal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';

import './index.scss';

class Modal extends Component {
  render() {
    const {open, handleClose} = this.props;

    return (
      <MaterialModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal-container"
        open={open}
        onClose={handleClose}
      >
        <div className="modal">
          <h3>Add Good</h3>
          <form>
            <Input name="lol" value="lol" />
          </form>
        </div>
      </MaterialModal>
    );
  }
}

export default Modal;
