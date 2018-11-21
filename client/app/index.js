import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import Table from 'components/Table';

import Header from './components/Header';
import NavigationBar from './components/Navigation';

import './index.scss';

class GoodsPage extends Component {
  state = {
    open: false,
  };

  handleAddClick = () => this.setState({open: true});

  handleClose = () => null;

  renderModal = () => (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={this.state.open}
      onClose={this.handleClose}
    >
      <div className="modal" style={{outline: 'none'}}>
        <Typography variant="h6" id="modal-title">
          Text in a modal
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </div>
    </Modal>
  );

  render() {
    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button variant="fab" color="primary" aria-label="Edit" className="edit-button">
            <Icon>edit_icon</Icon>
          </Button>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="goods-table">
            <Table />
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default GoodsPage;
