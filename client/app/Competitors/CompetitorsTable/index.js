import React, {Component} from 'react';

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
        {parsingRules}
      </div>
    </div>
  );

  render() {
    return (
      <Table
        headers={['Competitor ID', 'Name', 'Parsing Rules']}
      />
    );
  }
}

export default CompetitorsTable;
