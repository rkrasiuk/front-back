import SimpleSchema from 'simpl-schema';

const Competitors = new Mongo.Collection('competitors');

const competitorSchema = new SimpleSchema({
  name: String,
  parsingRules: String,
  goods: Array,
  'goods.$': Object,
  'goods.$.goodId': String,
  'goods.$.url': String,
  'goods.$.status': String,
  'goods.$.time': {type: String, optional: true},
  'goods.$.price': {type: String, optional: true},
});
Competitors.attachSchema(competitorSchema);

export default Competitors;
