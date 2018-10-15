import SimpleSchema from 'simpl-schema';
import Goods from 'collections/goods';
import Competitors from 'collections/competitors';
import CompetitorGoods from 'collections/competitorgoods';
import ParsedGoods from 'collections/parsedgoods';

Meteor.methods({
  'goods.addGood': ({
    vendorCode, name, brand, price,
  }) => {
    new SimpleSchema({
      vendorCode: {type: Number},
      name: {type: String},
      brand: {type: String},
      price: {type: Number},
    }).validate({
      vendorCode, name, brand, price,
    });

    return Goods.insert({
      vendorCode, name, brand, price,
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

  'competitorgoods.addCompetitorGood': ({goodId, competitorId, url}) => {
    new SimpleSchema({
      goodId: {type: String},
      competitorId: {type: String},
      url: {type: String},
    }).validate({goodId, competitorId, url});

    return CompetitorGoods.insert({goodId, competitorId, url});
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
