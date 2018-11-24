import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import Goods from 'collections/goods';
import Table from 'components/Table';

class GoodsTable extends Component {
  static propTypes = {
    onRowClick: PropTypes.func,
  };

  static defaultProps = {
    onRowClick: () => null,
  };

  renderRow = good => (
    <div className="row" key={uniqueid(good._id)} onClick={() => this.props.onRowClick(good)}>
      <div className="cell" data-title="Good ID">
        {good._id}
      </div>
      <div className="cell" data-title="Vendor Code">
        {good.vendorCode}
      </div>
      <div className="cell" data-title="Name">
        {good.name}
      </div>
      <div className="cell" data-title="Brand">
        {good.brand}
      </div>
      <div className="cell" data-title="Price">
        {`${good.price} UAH`}
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
