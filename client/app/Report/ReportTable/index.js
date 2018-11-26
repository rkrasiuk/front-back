import React, {Component, Fragment} from 'react';
import uniqueid from 'lodash.uniqueid';
import moment from 'moment';

import Table from 'components/Table';

const byBrand = brandFilter => ({brand}) => brand === brandFilter;

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
            {`${price} UAH`}
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

        {
          goods.slice(1).map(remainingGood => (
            <div className="row" key={uniqueid(goodId)}>
              <div className="cell" data-title="Good ID" />
              <div className="cell" data-title="Name" />
              <div className="cell" data-title="Brand" />
              <div className="cell" data-title="Price" />
              <div className="cell" data-title="Competitor" />
              <div className="cell" data-title="Time">
                {moment(remainingGood.time).format('DD.MM.YYYY')}
              </div>
              <div className="cell" data-title="Price">
                {remainingGood.price && `${remainingGood.price} UAH`}
              </div>
            </div>
          ))
        }

        {
          competitorgoods.slice(1).map(remainingCompetitor => (
            <Fragment>
              <div className="row" key={uniqueid(goodId)}>
                <div className="cell" data-title="Good ID" />
                <div className="cell" data-title="Name" />
                <div className="cell" data-title="Brand" />
                <div className="cell" data-title="Price" />
                <div className="cell" data-title="Competitor">
                  {remainingCompetitor.name}
                </div>
                <div className="cell" data-title="Time">
                  {moment(remainingCompetitor.goods[0].time).format('DD.MM.YYYY')}
                </div>
                <div className="cell" data-title="Price">
                  {remainingCompetitor.goods[0].price && `${remainingCompetitor.goods[0].price} UAH`}
                </div>
              </div>

              {
                remainingCompetitor.goods.slice(1).map(remainingCompetitorGood => (
                  <div className="row" key={uniqueid(goodId)}>
                    <div className="cell" data-title="Good ID" />
                    <div className="cell" data-title="Name" />
                    <div className="cell" data-title="Brand" />
                    <div className="cell" data-title="Price" />
                    <div className="cell" data-title="Competitor" />
                    <div className="cell" data-title="Time">
                      {moment(remainingCompetitorGood.time).format('DD.MM.YYYY')}
                    </div>
                    <div className="cell" data-title="Price">
                      {remainingCompetitorGood.price && `${remainingCompetitorGood.price} UAH`}
                    </div>
                  </div>
                ))
              }
            </Fragment>
          ))
        }
      </Fragment>
    );
  };

  filterAndGatherGoodData = filters => ({_id: goodId, ...rest}) => {
    const {competitors} = this.props;
    const competitorgoods = competitors
      .filter(({goods}) => goods.find(({goodId: parsedGoodId, price}) => goodId === parsedGoodId && price))
      .map(({goods, ...competitor}) => ({
        ...competitor,
        goods: goods.filter(({goodId: parsedGoodId, price}) => goodId === parsedGoodId && price),
      }));
    const competitorgoodsByCompetitor = (filters.competitor && competitorgoods
      .filter(({name}) => name === filters.competitor)) || competitorgoods;
    return competitorgoodsByCompetitor.length ? this.renderRow({
      _id: goodId, ...rest, competitorgoods: competitorgoodsByCompetitor,
    }) : null;
  };

  render() {
    const {goods, filters} = this.props;
    const goodsByBrand = (filters.brand && goods.filter(byBrand(filters.brand))) || goods;

    return (
      <Table
        headers={['Good ID', 'Name', 'Brand', 'Price', 'Competitor', 'Time', 'Price']}
        rowRenderer={this.filterAndGatherGoodData(filters)}
        data={goodsByBrand}
      />
    );
  }
}

export default ReportTable;
