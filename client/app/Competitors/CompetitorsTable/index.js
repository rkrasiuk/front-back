import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';

import Table from 'components/Table';

class CompetitorsTable extends Component {
  renderRow = ({
    _id, name, parsingRules,
  }) => (
    <div className="row" key={uniqueid(_id)}>
      <div className="cell" data-title="Competitor ID">
        {_id}
      </div>
      <div className="cell" data-title="Name">
        {name}
      </div>
      <div className="cell" data-title="Parsing Rules">
        {parsingRules || 'None'}
      </div>
    </div>
  );

  render() {
    const sampleObject = {
      _id: '8PsjoyNj7ms6gTGaD',
      name: 'Mobilluck.ua',
      parsingRules: '',
    };

    return (
      <Table
        headers={['Competitor ID', 'Name', 'Parsing Rules']}
        rowRenderer={this.renderRow}
        sample={sampleObject}
      />
    );
  }
}

export default CompetitorsTable;
