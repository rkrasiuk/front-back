import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import {withTracker} from 'meteor/react-meteor-data';
import uniqueid from 'lodash.uniqueid';

import Competitors from 'collections/competitors';

import CompetitorTable from './CompetitorTable';
import Header from '../components/Header';

class Competitor extends Component {
  render() {
    const competitorId = this.props.match.params.id;
    const competitor = this.props.competitors.find(({_id}) => competitorId === _id);

    console.log(competitor);
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
          <Button variant="fab" color="primary" aria-label="Edit" className="edit-button">
            <Icon>chevron_left</Icon>
          </Button>
        </Header>
        <div className="content">
          <div className="competitor-info">
            <h3 className="competitor-name">{name}</h3>
          </div>
          <div className="competitor-table">
            <CompetitorTable goods={goods} />
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('competitors.list').ready(),
  competitors: Competitors.find({}).fetch(),
}))(Competitor);
