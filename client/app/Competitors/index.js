import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

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
  };

  handleAddClick = () => this.setState({addCompetitorModal: true});
  handleAddCompetitorClose = () => this.setState({addCompetitorModal: false});

  renderAddCompetitorModal = () => (
    <Modal open={this.state.addCompetitorModal} handleClose={this.handleAddCompetitorClose}>
      <CompetitorForm handleClose={this.handleAddCompetitorClose} />
      <DroneRace />
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
          <div className="competitors-table">
            <CompetitorsTable />
          </div>
        </div>
        {this.renderAddCompetitorModal()}
      </div>
    );
  }
}

export default CompetitorsPage;
