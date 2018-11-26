import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import BookOutlined from '@material-ui/icons/BookOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withTracker} from 'meteor/react-meteor-data';
import uniqueid from 'lodash.uniqueid';
import XLSX from 'xlsx';

import Competitors from 'collections/competitors';
import Goods from 'collections/goods';
import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import ReportTable from './ReportTable';

import './index.scss';

const byBrand = brandFilter => ({brand}) => brand === brandFilter;

const byPrice = (goodPrice, priceFilter) => ({price: competitorPrice}) => {
  switch (priceFilter) {
    case 'less': return competitorPrice < goodPrice;
    case 'more': return competitorPrice > goodPrice;
    default: return competitorPrice === goodPrice;
  }
};

class Report extends Component {
  state = {
    brand: '',
    price: '',
    competitor: '',
  };

  handleChange = ({target: {name, value}}) => this.setState({[name]: value});

  filterAndGatherGoodData = () => {
    const filters = this.state;
    const {competitors} = this.props;
    const goodsByBrand = (filters.brand && this.props.goods.filter(byBrand(filters.brand))) || this.props.goods;
    let parsedGoods = [];
    goodsByBrand.forEach(({_id: goodId, price: goodPrice, ...rest}) => {
      const competitorgoods = competitors
        .filter(({goods}) => goods.find(({goodId: parsedGoodId, price}) => goodId === parsedGoodId && price))
        .map(({goods, ...competitor}) => ({
          ...competitor,
          goods: goods.filter(({goodId: parsedGoodId, price}) => goodId === parsedGoodId && price),
        }));

      const competitorgoodsByCompetitor = (filters.competitor && competitorgoods
        .filter(({name}) => name === filters.competitor)) || competitorgoods;
      const competitorgoodsFiltered = (filters.price && competitorgoodsByCompetitor
        .filter(({goods}) => goods.find((byPrice(goodPrice, filters.price))))
        .map(({goods, ...competitor}) => ({
          ...competitor,
          goods: goods.filter(byPrice(goodPrice, filters.price)),
        }))) || competitorgoodsByCompetitor;

      if (competitorgoodsFiltered.length) {
        parsedGoods = [...parsedGoods, {
          _id: goodId, price: goodPrice, ...rest, competitorgoods: competitorgoodsFiltered,
        }];
      }
    });
    return parsedGoods;
  }

  createReport = () => {
    const parsedGoods = this.filterAndGatherGoodData();
    const headers = ['Good ID', 'Name', 'Brand', 'Price', 'Competitor', 'Time', 'Price'];
    let goodRows = [headers];
    parsedGoods.forEach(({
      _id, name, brand, price, competitorgoods,
    }) => {
      competitorgoods.forEach(({name: competitorName, goods}) => {
        goods.forEach(({time, price: competitorPrice}) => {
          goodRows = [...goodRows, [_id, name, brand, price, competitorName, time, competitorPrice]];
        });
      });
    });
    // console.log(goodRows)

    const ws = XLSX.utils.aoa_to_sheet(goodRows);
    const wscols = [{wch: 30}, {wch: 40}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 40}, {wch: 20}];
    ws['!cols'] = wscols;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'report.xlsx');
  };

  render() {
    const {goods, competitors} = this.props;

    const brands = [...new Set(goods.filter(({brand}) => brand).map(({brand}) => brand))];
    const prices = ['less', 'equal', 'more'];
    const competitorNames = [...new Set(competitors.map(({name}) => name))];

    return (
      <div className="app">
        <Header>
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
            <InputLabel htmlFor="price-select">{'Competitor\'s Price'}</InputLabel>
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
              {competitorNames.map(competitor => (
                <MenuItem key={uniqueid(competitor)} value={competitor}>{competitor}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={this.createReport} variant="fab" color="primary" aria-label="Save" className="edit-button">
            <BookOutlined />
          </Button>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="report-table">
            <ReportTable competitors={competitors} goods={this.filterAndGatherGoodData(goods)} filters={this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready() && Meteor.subscribe('competitors.list').ready(),
  goods: Goods.find().fetch(),
  competitors: Competitors.find().fetch(),
}))(Report);
