import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import uniqueid from 'lodash.uniqueid';

import Competitors from 'collections/competitors';

class Competitor extends Component {
  render() {
    const competitorId = this.props.match.params.id;
    const competitor = this.props.competitors.find(({_id}) => competitorId === _id);

    if (!competitor) {
      return (
        <div style={{width: '100vw', padding: '2vh 4vw'}}>
          <p>No goods are registered for this competitor</p>
        </div>
      );
    }

    const {goods = []} = competitor;

    return (
      <div style={{width: '100vw', padding: '2vh 4vw'}}>
        <h1>Competitor ID</h1>
        {goods.map(({goodId, url}) => (
          <div key={uniqueid()} style={{width: '80%', display: 'flex', justifyContent: 'space-between'}}>
            <p>GoodId: {goodId}</p>
            <p>URL: {url}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('competitors.list').ready(),
  competitors: Competitors.find({}).fetch(),
}))(Competitor);
