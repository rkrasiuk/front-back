import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import moment from 'moment';

import Table from 'components/Table';

class CompetitorTable extends Component {
  renderRow = ({
    goodId, url, status, time, price,
  }) => (
    <div className="row" key={uniqueid(goodId)}>
      <div className="cell" data-title="Good ID">
        {goodId}
      </div>
      <div className="cell" data-title="URL">
        {url}
      </div>
      <div className="cell" data-title="Status">
        {status}
      </div>
      <div className="cell" data-title="Time">
        {moment(time).format('DD-MM-YYYY')}
      </div>
      <div className="cell" data-title="Price">
        {price && `${price} UAH`}
      </div>
    </div>
  );

  render() {
    const {goods} = this.props;

    return (
      <Table
        headers={['Good ID', 'URL', 'Status', 'Time', 'Price']}
        rowRenderer={this.renderRow}
        data={goods}
      />
    );
  }
}

export default CompetitorTable;
