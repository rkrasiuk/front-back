import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withTracker} from 'meteor/react-meteor-data';

import Goods from 'collections/goods';
import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import ReportTable from './ReportTable';

import './index.scss';

class Report extends Component {
  state = {
    brand: '',
    price: '',
    competitor: '',
  };

  handleChange = ({target: {name, value}}) => this.setState({[name]: value});

  render() {
    const brands = ['Brand 1', 'Brand 2', 'Brand 3'];
    const prices = ['Price 1', 'Price 2', 'Price 3'];
    const competitors = [
      'Competitor 1', 'Competitor 2', 'Competitor 3',
      'Competitor 1', 'Competitor 2', 'Competitor 3',
    ];

    return (
      <div className="app">
        <Header>
          {
            // brand
            // competitor
            // date
            // our price compared to competitor's
          }
          <FormControl className="report-select">
            <InputLabel htmlFor="brand-select">Brand</InputLabel>
            <Select
              value={this.state.brand}
              onChange={this.handleChange}
              inputProps={{
                name: 'brand',
                id: 'brand-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {brands.map(brand => <MenuItem key={uniqueid(brand)} value={brand}>{brand}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className="report-select">
            <InputLabel htmlFor="price-select">Price</InputLabel>
            <Select
              value={this.state.price}
              onChange={this.handleChange}
              inputProps={{
                name: 'price',
                id: 'brand-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {prices.map(price => <MenuItem key={uniqueid(price)} value={price}>{price}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className="report-select">
            <InputLabel htmlFor="competitor-select">Competitor</InputLabel>
            <Select
              value={this.state.competitor}
              onChange={this.handleChange}
              inputProps={{
                name: 'competitor',
                id: 'competitor-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {competitors.map(competitor => (
                <MenuItem key={uniqueid(competitor)} value={competitor}>{competitor}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button variant="fab" color="primary" aria-label="Edit" className="edit-button">
            <Icon>edit_icon</Icon>
          </Button>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="report-table">
            <ReportTable goods={this.props.goods} />
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready(),
  goods: Goods.find().fetch(),
}))(Report);
