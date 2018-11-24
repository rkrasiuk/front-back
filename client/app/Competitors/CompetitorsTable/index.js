import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import {withTracker} from 'meteor/react-meteor-data';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Competitors from 'collections/competitors';
import Table from 'components/Table';

class CompetitorsTable extends Component {
  static propTypes = {
    deleteMode: PropTypes.bool,
  };

  static defaultProps = {
    deleteMode: false,
  };

  removeCompetitor = (_id, name) => {
    const confirmed = confirm(`Are you sure you want to delete ${name}`);
    if (!confirmed) {
      return;
    }

    Meteor.call('competitors.removeCompetitor', {_id}, (err) => {
      if (err) {
        alert(err);
        return console.error(err);
      }
      alert('Competitor Deleted');
    });
  };

  renderRowWithLink = ({
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

  renderRow = ({
    _id, name, parsingRules,
  }) => (
    <div onClick={() => this.removeCompetitor(_id, name)} className="row" key={uniqueid(_id)}>
      <div className="cell" data-title="Competitor ID">
        {_id}
      </div>
      <div className="cell" data-title="Name">
        {name}
      </div>
      <div className="cell" data-title="Parsing Rules">
        {parsingRules || 'None'}
      </div>
    </div>
  );

  render() {
    const {competitors, deleteMode} = this.props;

    return (
      <Table
        headers={['Competitor ID', 'Name', 'Parsing Rules']}
        rowRenderer={deleteMode ? this.renderRow : this.renderRowWithLink}
        data={competitors}
      />
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('competitors.list').ready(),
  competitors: Competitors.find().fetch(),
}))(CompetitorsTable);
