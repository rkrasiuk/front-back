/* eslint-disable no-useless-escape */
import SimpleSchema from 'simpl-schema';
import axios from 'axios';
import {parse} from 'node-html-parser';
import isUrl from 'is-url';
import moment from 'moment';

import Goods from 'collections/goods';
import Competitors from 'collections/competitors';
import CompetitorGoods from 'collections/competitorgoods';
import ParsedGoods from 'collections/parsedgoods';

Meteor.methods({
  'goods.addGood': ({
    id, vendorCode, name, brand, price,
  }) => {
    new SimpleSchema({
      id: {type: String},
      vendorCode: {type: Number},
      name: {type: String},
      brand: {type: String},
      price: {type: Number},
    }).validate({
      id, vendorCode, name, brand, price,
    });

    return Goods.insert({
      _id: id, vendorCode, name, brand, price,
    });
  },

  'goods.removeGood': ({_id}) => {
    new SimpleSchema({
      _id: {type: SimpleSchema.RegEx.Id},
    }).validate({_id});

    return Goods.remove({_id});
  },

  'competitors.addCompetitor': ({name, parsingRules}) => {
    new SimpleSchema({
      name: {type: String},
      parsingRules: {type: String},
    }).validate({name, parsingRules});

    return Competitors.insert({name, parsingRules});
  },

  'competitors.removeCompetitor': ({_id}) => {
    new SimpleSchema({
      _id: {type: SimpleSchema.RegEx.Id},
    }).validate({_id});

    return Competitors.remove({_id});
  },

  'competitorgoods.addCompetitorGood': async ({goodId, competitorId, url}) => {
    new SimpleSchema({
      goodId: {type: String},
      competitorId: {type: String},
      url: {type: String},
    }).validate({goodId, competitorId, url});

    if (!isUrl(url)) {
      throw new Meteor.Error('Not a valid url');
    }

    CompetitorGoods.insert({goodId, competitorId, url});

    // 'https://www.mobilluck.com.ua/katalog/naboru_kastrul/peterhof/peterhof-PH-15136-91958.html'
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

    const price = htmlPrice && htmlPrice.firstChild.text && parseInt(htmlPrice.firstChild.text.split(' ').join(''));
    console.log(price);

    return ParsedGoods.insert({
      time: moment().format(), goodId, competitorId, price,
    });
  },

  'competitorgoods.removeCompetitorGood': ({_id}) => {
    new SimpleSchema({
      _id: {type: SimpleSchema.RegEx.Id},
    }).validate({_id});

    return CompetitorGoods.remove({_id});
  },

  'parsedgoods.addParsedGood': ({
    time, goodId, competitorId, price,
  }) => {
    new SimpleSchema({
      time: {type: String},
      goodId: {type: String},
      competitorId: {type: String},
      price: {type: Number},
    }).validate({
      time, goodId, competitorId, price,
    });

    return ParsedGoods.insert({
      time, goodId, competitorId, price,
    });
  },

  'parsedgoods.removeParsedGood': ({_id}) => {
    new SimpleSchema({
      _id: {type: SimpleSchema.RegEx.Id},
    }).validate({_id});

    return ParsedGoods.remove({_id});
  },
});
