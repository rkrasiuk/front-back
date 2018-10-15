import SimpleSchema from 'simpl-schema';

const CompetitorGoods = new Mongo.Collection('competitorgoods');

const competitorGoodsSchema = new SimpleSchema({
  goodId: String,
  competitorId: String,
  url: String,
});

CompetitorGoods.attachSchema(competitorGoodsSchema);

export default CompetitorGoods;
