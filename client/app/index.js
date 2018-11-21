import React, {Component} from 'react';

import Table from 'components/Table';

import NavigationBar from './components/Navigation';
import './index.scss';

class Application extends Component {
  render() {
    return (
      <div className="app">
        <NavigationBar />
        <Table />
      </div>
    );
  }
}

export default Application;
