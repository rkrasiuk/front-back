import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import ReactTooltip from 'react-tooltip'

import Modal from 'components/Modal';
import Logistics from 'illustrations/logistics';
import InProgress from 'illustrations/inprogress';

import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import GoodForm from './GoodForm';
import GoodsTable from './GoodsTable';

import './index.scss';

class GoodsPage extends Component {
  state = {
    addGoodModal: false,
    editGoodModal: false,
    editMode: false,
    editValues: null,
  };

  handleAddClick = () => this.setState({addGoodModal: true});

  handleEditClick = ({_id, ...rest}) => this.setState({editGoodModal: true, editValues: {goodId: _id, ...rest}});

  handleAddGoodClose = () => this.setState({addGoodModal: false});

  handleEditGoodClose = () => this.setState({editGoodModal: false, editMode: false});

  toggleEditMode = () => this.setState(({editMode}) => ({editMode: !editMode}));

  renderAddGoodModal = () => (
    <Modal open={this.state.addGoodModal} handleClose={this.handleAddGoodClose}>
      <GoodForm
        handleClose={this.handleAddGoodClose}
        headerText="Add Good"
        buttonText="Submit"
      />
      <Logistics />
    </Modal>
  );

  renderEditGoodModal = good => (
    <Modal open={this.state.editGoodModal} handleClose={this.handleEditGoodClose}>
      <GoodForm
        handleClose={this.handleEditGoodClose}
        headerText="Edit Good"
        buttonText="Save"
        values={good}
      />
      <InProgress />
    </Modal>
  );

  render() {
    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button onClick={this.toggleEditMode} data-tip="React-tooltip" variant="fab" color={this.state.editMode ? 'default' : 'primary'} aria-label="Edit" className="edit-button">
            <Icon>edit_icon</Icon>
          </Button>
          <ReactTooltip place="top" type="dark" effect="float">
            <span>Click on the row to edit</span>
          </ReactTooltip>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="goods-table">
            <GoodsTable onRowClick={this.state.editMode && this.handleEditClick} />
          </div>
        </div>
        {this.renderAddGoodModal()}
        {this.renderEditGoodModal(this.state.editValues)}
      </div>
    );
  }
}

export default GoodsPage;
