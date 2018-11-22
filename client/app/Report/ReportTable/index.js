import React, {Component} from 'react';

import Table from 'components/Table';

class ReportTable extends Component {
  renderRow = () => null;

  render() {
    return (
      <Table
        headers={['Good ID', 'Name', 'Price', 'Time', 'Competitor', 'Price']}
        rowRenderer={this.renderRow}
        data={[]}
      />
    );
  }
}

export default ReportTable;
