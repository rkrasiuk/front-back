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
  console.log(price, time);

  const updatedGoods = goods.map((good) => {
    if (goodId === good.goodId) {
      console.log(good)
      return {
        goodId, url, status: 'Parsed', time, price,
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

  'competitors.addCompetitor': ({name, parsingRules}) => (
    Competitors.insert({name, parsingRules: parsingRules || 'None', goods: []})
  ),

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
    console.log('done');
  },
});
