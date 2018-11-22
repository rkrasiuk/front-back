import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';

import './index.scss';

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    rowRenderer: PropTypes.func,
  };

  static defaultProps = {
    headers: [],
    rowRenderer: () => null,
  };

  renderHeader = header => <div className="cell" key={uniqueid(header)}>{header}</div>;

  render() {
    const {headers, rowRenderer} = this.props;
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

            {Array.from(Array(20).keys()).map(() => rowRenderer(sampleObject))}
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
