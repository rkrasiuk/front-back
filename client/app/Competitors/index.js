import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactTooltip from 'react-tooltip';

import Modal from 'components/Modal';
import DroneRace from 'illustrations/dronerace';

import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import CompetitorsTable from './CompetitorsTable';
import CompetitorForm from './CompetitorForm';

import './index.scss';

class CompetitorsPage extends Component {
  state = {
    addCompetitorModal: false,
    deleteMode: false,
  };

  handleAddClick = () => this.setState({addCompetitorModal: true});

  handleAddCompetitorClose = () => this.setState({addCompetitorModal: false});

  toggleDeleteMode = () => this.setState(({deleteMode}) => ({deleteMode: !deleteMode}));

  renderAddCompetitorModal = () => (
    <Modal open={this.state.addCompetitorModal} handleClose={this.handleAddCompetitorClose}>
      <CompetitorForm handleClose={this.handleAddCompetitorClose} />
      <DroneRace />
    </Modal>
  );

  render() {
    const {deleteMode} = this.state;

    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button onClick={this.toggleDeleteMode} variant="fab" color={deleteMode ? 'default' : 'primary'} aria-label="Edit" className="edit-button">
            <DeleteIcon data-tip="React-tooltip" />
          </Button>
          <ReactTooltip place="top" type="dark" effect="float">
            <span>Click on the row to delete</span>
          </ReactTooltip>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="competitors-table">
            <CompetitorsTable deleteMode={deleteMode} />
          </div>
        </div>
        {this.renderAddCompetitorModal()}
      </div>
    );
  }
}

export default CompetitorsPage;
