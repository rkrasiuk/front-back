import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import Table from 'components/Table';
import Modal from 'components/Modal';
import Logistics from 'illustrations/logistics';

import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import GoodForm from './GoodForm';

import './index.scss';

class GoodsPage extends Component {
  state = {
    addGoodModal: false,
  };

  handleAddClick = () => this.setState({addGoodModal: true});

  handleClose = () => this.setState({addGoodModal: false});

  renderModal = () => (
    <Modal open={this.state.addGoodModal} handleClose={this.handleClose}>
      <GoodForm />
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
