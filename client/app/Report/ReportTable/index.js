import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';

import Table from 'components/Table';

const byBrand = brandFilter => ({brand}) => brand === brandFilter;

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
    const {goods, filters: {brand, price}} = this.props;
    const goodsByBrand = (brand && goods.filter(byBrand(brand))) || goods;

    return (
      <Table
        headers={['Good ID', 'Name', 'Brand', 'Price', 'Time', 'Competitor', 'Price']}
        rowRenderer={this.renderRow}
        data={goodsByBrand}
      />
    );
  }
}

export default ReportTable;
