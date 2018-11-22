import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';

import './index.scss';

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  renderHeader = header => <div className="cell" key={uniqueid(header)}>{header}</div>;

  render() {
    const {headers, rowRenderer, data, sample} = this.props;

    return (
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="table">

            <div className="row header">
              {headers.map(this.renderHeader)}
            </div>

            {data.map(rowRenderer)}
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
