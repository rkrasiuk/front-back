import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import {NavLink} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';

import Competitors from 'collections/competitors';
import Modal from 'components/Modal';
import Logistics from 'illustrations/logistics';
import VehicleSale from 'illustrations/vehiclesale';

import CompetitorTable from './CompetitorTable';
import CompetitorGoodForm from './CompetitorGoodForm';
import Header from '../components/Header';

class Competitor extends Component {
  state = {
    addCompetitorGoodModal: false,
  };

  handleAddClick = () => this.setState({addCompetitorGoodModal: true});

  handleAddCompetitorGoodClose = () => this.setState({addCompetitorGoodModal: false});

  renderAddCompetitorGoodModal = () => (
    <Modal open={this.state.addCompetitorGoodModal} handleClose={this.handleAddCompetitorGoodClose}>
      <CompetitorGoodForm competitorId={this.props.match.params.id} />
      <VehicleSale />
    </Modal>
  );

  render() {
    const competitorId = this.props.match.params.id;
    const competitor = this.props.competitors.find(({_id}) => competitorId === _id);

    // TODO: Change empty page message
    if (!competitor) {
      return (
        <div style={{width: '100vw', padding: '2vh 4vw'}}>
          <p>No goods are registered for this competitor</p>
        </div>
      );
    }

    const {goods = [], name} = competitor;

    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <NavLink to="/competitors">
            <Button onClick={this.handleBackClick} variant="fab" color="primary" aria-label="Edit" className="edit-button">
              <Icon>chevron_left</Icon>
            </Button>
          </NavLink>
        </Header>
        <div className="content">
          <div className="competitor-info">
            <h3 className="competitor-name">{name}</h3>
          </div>
          <div className="competitor-table">
            <CompetitorTable goods={goods} />
          </div>
        </div>
        {this.renderAddCompetitorGoodModal()}
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('competitors.list').ready(),
  competitors: Competitors.find({}).fetch(),
}))(Competitor);
