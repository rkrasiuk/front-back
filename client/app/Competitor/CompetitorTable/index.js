import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import moment from 'moment';
import {withTracker} from 'meteor/react-meteor-data';

import Table from 'components/Table';
import Goods from 'collections/goods';

class CompetitorTable extends Component {
  renderRow = ({
    goodId, name, url, status, time, price,
  }) => (
    <div className="row" key={uniqueid(goodId)}>
      <div className="cell" data-title="Good ID">
        {goodId}
      </div>
      <div className="cell" data-title="Name">
        {name}
      </div>
      <div className="cell" data-title="URL">
        {url}
      </div>
      <div className="cell" data-title="Status">
        {status}
      </div>
      <div className="cell" data-title="Time">
        {moment(time).format('DD.MM.YYYY')}
      </div>
      <div className="cell" data-title="Price">
        {price && `${price} UAH`}
      </div>
    </div>
  );

  render() {
    const {goods, data = []} = this.props;
    const competitorgoods = data.map(({goodId, ...rest}) => ({goodId, ...rest, name: goods.length && goods.find(({_id}) => _id === goodId).name}));

    return (
      <Table
        headers={['Good ID', 'Name', 'URL', 'Status', 'Time', 'Price']}
        rowRenderer={this.renderRow}
        data={competitorgoods}
      />
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready(),
  goods: Goods.find({}).fetch(),
}))(CompetitorTable);
