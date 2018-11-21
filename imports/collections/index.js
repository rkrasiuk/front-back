import SimpleSchema from 'simpl-schema';

const Competitors = new Mongo.Collection('competitors');
const Goods = new Mongo.Collection('goods');

const goodSchema = new SimpleSchema({
  goodId: String,
  vendorCode: Number,
  name: String,
  brand: String,
  price: Number,
});
Goods.attachSchema(goodSchema);

const competitorSchema = new SimpleSchema({
  name: String,
  parsingRules: String,
  goods: Array,
  'goods.$': Object,
  'goods.$.goodId': String,
  'goods.$.url': String,
  'goods.$.parsed': Boolean,
  'goods.$.time': String,
  'goods.$.price': String,
});
Competitors.attachSchema(competitorSchema);

export default {Competitors, Goods};
