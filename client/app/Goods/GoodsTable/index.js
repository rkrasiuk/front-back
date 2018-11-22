import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import {withTracker} from 'meteor/react-meteor-data';

import Goods from 'collections/goods';
import Table from 'components/Table';

class GoodsTable extends Component {
  renderRow = ({
    _id: goodId, vendorCode, name, brand, price,
  }) => (
    <div className="row" key={uniqueid(goodId)}>
      <div className="cell" data-title="Good ID">
        {goodId}
      </div>
      <div className="cell" data-title="Vendor Code">
        {vendorCode}
      </div>
      <div className="cell" data-title="Name">
        {name}
      </div>
      <div className="cell" data-title="Brand">
        {brand}
      </div>
      <div className="cell" data-title="Price">
        {`${price} UAH`}
      </div>
    </div>
  );

  render() {
    const {goods} = this.props;

    return (
      <Table
        headers={['Good ID', 'Vendor Code', 'Name', 'Brand', 'Price']}
        rowRenderer={this.renderRow}
        data={goods}
      />
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready(),
  goods: Goods.find().fetch(),
}))(GoodsTable);
