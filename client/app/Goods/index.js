import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import Modal from 'components/Modal';
import Logistics from 'illustrations/logistics';

import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import GoodForm from './GoodForm';
import GoodsTable from './GoodsTable';

import './index.scss';

class GoodsPage extends Component {
  state = {
    addGoodModal: false,
    editGoodModal: false,
  };

  handleAddClick = () => this.setState({addGoodModal: true});

  handleEditClick = () => this.setState({editGoodModal: true});

  handleAddGoodClose = () => this.setState({addGoodModal: false});

  handleEditGoodClose = () => this.setState({editGoodModal: false});

  renderAddGoodModal = () => (
    <Modal open={this.state.addGoodModal} handleClose={this.handleAddGoodClose}>
      <GoodForm handleClose={this.handleAddGoodClose} buttonText="Submit" />
      <Logistics />
    </Modal>
  );

  renderEditGoodModal = () => (
    <Modal open={this.state.editGoodModal} handleClose={this.handleEditGoodClose}>
      <GoodForm
        handleClose={this.handleEditGoodClose}
        buttonText="Save"
      />
      <Logistics />
    </Modal>
  );

  render() {
    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button onClick={this.handleEditClick} variant="fab" color="primary" aria-label="Edit" className="edit-button">
            <Icon>edit_icon</Icon>
          </Button>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="goods-table">
            <GoodsTable />
          </div>
        </div>
        {this.renderAddGoodModal()}
        {this.renderEditGoodModal()}
      </div>
    );
  }
}

export default GoodsPage;
