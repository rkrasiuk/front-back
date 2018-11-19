import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import uniqueid from 'lodash.uniqueid';

import CompetitorGoods from 'collections/competitorgoods';
import Button from 'components/Button';

class Competitor extends Component {
  render() {
    const currCompetitorId = this.props.match.params.id;
    const goods = this.props.competitorgoods.filter(({competitorId}) => competitorId === currCompetitorId);

    if (!goods.length) {
      return (
        <div style={{width: '100vw', padding: '2vh 4vw'}}>
          <Button onClick={() => this.props.history.push('/')}>{'< Back'}</Button>
          <p>No goods are registered for this competitor</p>
        </div>
      );
    }

    return (
      <div style={{width: '100vw', padding: '2vh 4vw'}}>
        <Button onClick={() => this.props.history.push('/')}>{'< Back'}</Button>
        <h1>Competitor ID - {currCompetitorId}</h1>
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
  ready: Meteor.subscribe('competitorgoods.list').ready(),
  competitorgoods: CompetitorGoods.find({}).fetch(),
}))(Competitor);
