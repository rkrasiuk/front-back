import SimpleSchema from 'simpl-schema';

const Competitors = new Mongo.Collection('competitors');

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

export default Competitors;