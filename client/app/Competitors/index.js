import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import Table from 'components/Table';

import Header from '../components/Header';
import NavigationBar from '../components/Navigation';

import './index.scss';

class CompetitorsPage extends Component {
  render() {
    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button variant="fab" color="primary" aria-label="Edit" className="edit-button">
            <Icon>edit_icon</Icon>
          </Button>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="goods-table">
            <Table
              headers={['Good ID', 'Vendor Code', 'Name', 'Brand', 'Price']}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CompetitorsPage;
