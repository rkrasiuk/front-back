import axios from 'axios';
import {parse} from 'node-html-parser';
import moment from 'moment';

import Competitors from 'collections/competitors';
import Goods from 'collections/goods';

const parseGood = async (competitorId, goodId, url, {parsingRules, goods}) => {
  const response = await axios.get(url);
  const root = parse(response.data);

  let htmlPrice;

  if (url.match(/.*((mobilluck)|(nobu)).*/gm)) {
    htmlPrice = root.querySelector('.price');
  } else if (url.match(/.*a-techno.*/gm)) {
    htmlPrice = root.querySelector('#price');
  } else if (url.match(/.*officeman.*/gm)) {
    htmlPrice = root.querySelector('.main');
  }

  const price = htmlPrice && htmlPrice.firstChild.text && parseInt(htmlPrice.firstChild.text.split(' ').join(''), 10);
  const time = moment().format();

  const updatedGoods = goods.map((good) => {
    if (goodId === good.goodId) {
      console.log(good)
      return {
        goodId, url, status: price ? 'Parsed' : 'Failed', time, price,
      };
    }
    return good;
  });

  Competitors.update({_id: competitorId}, {$set: {goods: updatedGoods}});
};

Meteor.methods({
  'goods.addGood': ({
    goodId, vendorCode, price, ...rest,
  }) => (
    Goods.insert({
      _id: goodId, vendorCode: Number(vendorCode), price: Number(price), ...rest,
    })
  ),

  'goods.updateGood': ({
    goodId, vendorCode, price, ...rest,
  }) => (
    Goods.update({_id: goodId}, {$set: {vendorCode: Number(vendorCode), price: Number(price), ...rest}})
  ),


  'goods.parseFile': ({data}) => {
    if (!data) {
      throw new Meteor.Error('Not valid data');
    }
    // const headers = data[0];
    const info = data.slice(1);
    info.forEach(record => Goods.insert({_id: `${record[0]}`, vendorCode: record[1], name: record[2]}));
  },

  'competitors.addCompetitor': ({name, parsingRules}) => (
    Competitors.insert({name, parsingRules: parsingRules || 'None', goods: []})
  ),

  'competitors.removeCompetitor': ({_id}) => Competitors.remove({_id}),

  'competitors.addCompetitorGood': ({competitorId, goodId, url}) => {
    Competitors.update({_id: competitorId}, {
      $addToSet: {
        goods: {
          goodId, url, status: 'Parsing',
        },
      },
    });
    const competitor = Competitors.findOne({_id: competitorId});
    parseGood(competitorId, goodId, url, competitor);
  },
});
