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
    <div className="row">
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
        {price}
      </div>
    </div>
  );

  render() {
    // const {headers} = this.props;
    const headers = ['Good ID', 'Vendor Code', 'Name', 'Brand', 'Price'];
    const sampleObject = {
      goodId: 'Vincent Williamson',
      vendorCode: 31,
      name: 'iOS Developer',
      brand: 'Washington',
      price: 1000,
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
