import React, {Component} from 'react';
import MaterialModal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

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
        <div className="modal" style={{outline: 'none'}}>
          <Typography variant="h6" id="modal-title">
            Text in a modal
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </MaterialModal>
    );
  }
}

export default Modal;
