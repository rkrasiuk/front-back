import SimpleSchema from 'simpl-schema';

const Goods = new Mongo.Collection('goods');

const goodSchema = new SimpleSchema({
  vendorCode: Number,
  name: String,
  brand: {type: String, optional: true},
  price: {type: Number, optional: true},
});
Goods.attachSchema(goodSchema);

export default Goods;
