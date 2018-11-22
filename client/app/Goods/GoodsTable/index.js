import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';

import Table from 'components/Table';

class GoodsTable extends Component {
  renderRow = ({
    goodId, vendorCode, name, brand, price,
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
        {price} UAH
      </div>
    </div>
  );

  render() {
    return (
      <Table
        headers={['Good ID', 'Vendor Code', 'Name', 'Brand', 'Price']}
        rowRenderer={this.renderRow}
      />
    );
  }
}

export default GoodsTable;
