import React, {Component, Fragment} from 'react';
import uniqueid from 'lodash.uniqueid';
import moment from 'moment';

import Table from 'components/Table';

const byBrand = brandFilter => ({brand}) => brand === brandFilter;

const byPrice = (goodPrice, priceFilter) => ({price: competitorPrice}) => {
  switch (priceFilter) {
    case 'less': return competitorPrice < goodPrice;
    case 'more': return competitorPrice > goodPrice;
    default: return competitorPrice === goodPrice;
  }
};

class ReportTable extends Component {
  renderRow = ({
    _id: goodId, name, brand, price, competitorgoods,
  }) => {
    const {name: competitorName, goods} = competitorgoods[0];
    const {time, price: competitorPrice} = goods[0];

    return (
      <Fragment>
        <div className="row" key={uniqueid(goodId)}>
          <div className="cell" data-title="Good ID">
            {goodId}
          </div>
          <div className="cell" data-title="Name">
            {name}
          </div>
          <div className="cell" data-title="Brand">
            {brand}
          </div>
          <div className="cell" data-title="Price">
            {price && `${price} UAH`}
          </div>
          <div className="cell" data-title="Competitor">
            {competitorName}
          </div>
          <div className="cell" data-title="Time">
            {moment(time).format('DD.MM.YYYY')}
          </div>
          <div className="cell" data-title="Price">
            {competitorPrice && `${competitorPrice} UAH`}
          </div>
        </div>

        {goods.length > 1 && this.renderRow({competitorgoods: [{goods: competitorgoods[0].goods.slice(1)}]})}
        {competitorgoods.length > 1 && this.renderRow({competitorgoods: competitorgoods.slice(1)})}
      </Fragment>
    );
  };

  filterAndGatherGoodData = filters => ({_id: goodId, price: goodPrice, ...rest}) => {
    const {competitors} = this.props;
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

    return competitorgoodsFiltered.length ? this.renderRow({
      _id: goodId, price: goodPrice, ...rest, competitorgoods: competitorgoodsFiltered,
    }) : null;
  };

  render() {
    const {goods, filters} = this.props;
    const goodsByBrand = (filters.brand && goods.filter(byBrand(filters.brand))) || goods;

    return (
      <Table
        headers={['Good ID', 'Name', 'Brand', 'Price', 'Competitor', 'Time', 'Price']}
        rowRenderer={this.renderRow}
        data={goodsByBrand}
      />
    );
  }
}

export default ReportTable;
