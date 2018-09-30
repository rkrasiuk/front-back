import SimpleSchema from 'simpl-schema';

const Goods = new Mongo.Collection('goods');

const goodSchema = new SimpleSchema({
  id: SimpleSchema.RegEx.Id,
  vendorCode: Number,
  name: String,
  brand: String,
  price: Number,
});

Goods.attachSchema(goodSchema);

export default Goods;
