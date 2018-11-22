import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import {withTracker} from 'meteor/react-meteor-data';
import {NavLink} from 'react-router-dom';

import Competitors from 'collections/competitors';
import Table from 'components/Table';

class CompetitorsTable extends Component {
  renderRow = ({
    _id, name, parsingRules,
  }) => (
    <NavLink to={`/competitor/${_id}`} style={{textDecoration: 'none'}} className="row" key={uniqueid(_id)}>
      <div className="cell" data-title="Competitor ID">
        {_id}
      </div>
      <div className="cell" data-title="Name">
        {name}
      </div>
      <div className="cell" data-title="Parsing Rules">
        {parsingRules || 'None'}
      </div>
    </NavLink>
  );

  render() {
    const {competitors} = this.props;

    return (
      <Table
        headers={['Competitor ID', 'Name', 'Parsing Rules']}
        rowRenderer={this.renderRow}
        data={competitors}
      />
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('competitors.list').ready(),
  competitors: Competitors.find().fetch(),
}))(CompetitorsTable);
