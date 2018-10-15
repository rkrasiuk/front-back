import SimpleSchema from 'simpl-schema';

const ParsedGoods = new Mongo.Collection('parsedgoods');

const parsedGoodsSchema = new SimpleSchema({
  time: String,
  goodId: String,
  competitorId: String,
  price: Number,
});

ParsedGoods.attachSchema(parsedGoodsSchema);

export default ParsedGoods;
