import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';

import Table from 'components/Table';

class ReportTable extends Component {
  renderRow = ({
    _id: goodId, name, brand, price,
  }) => (
    <div className="row" key={uniqueid(goodId)}>
      <div className="cell" data-title="Good ID">
        {goodId}
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
      <div className="cell" data-title="Time">
        {'   '}
      </div>
      <div className="cell" data-title="Competitor">
        {'   '}
      </div>
      <div className="cell" data-title="Price">
        {' UAH'}
      </div>
    </div>
  );

  render() {
    const {goods} = this.props;

    return (
      <Table
        headers={['Good ID', 'Name', 'Brand', 'Price', 'Time', 'Competitor', 'Price']}
        rowRenderer={this.renderRow}
        data={goods}
      />
    );
  }
}

export default ReportTable;
