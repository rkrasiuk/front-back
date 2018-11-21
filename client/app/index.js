import React, {Component} from 'react';

import Table from 'components/Table';

import NavigationBar from './components/Navigation';

import './index.scss';

class GoodsPage extends Component {
  render() {
    return (
      <div className="app">
        <NavigationBar />
        <div className="goods-table">
          <button>lol</button>
          <Table />
        </div>
      </div>
    );
  }
}

export default GoodsPage;
