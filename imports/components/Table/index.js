import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';

import './index.scss';

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    headers: [],
  };

  renderHeader = header => <div className="cell" key={uniqueid(header)}>{header}</div>;

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
    // const {headers} = this.props;
    const headers = ['Good ID', 'Vendor Code', 'Name', 'Brand', 'Price'];
    const sampleObject = {
      goodId: 'GAmJ5e7d342RNcwTS',
      vendorCode: 1020307,
      name: 'Брошюровщик Agent B-15 H yellow',
      brand: 'Agent',
      price: 1638,
    };

    return (
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="table">

            <div className="row header">
              {headers.map(this.renderHeader)}
            </div>

            {Array.from(Array(20).keys()).map(() => this.renderRow(sampleObject))}
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
