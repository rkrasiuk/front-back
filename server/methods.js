import SimpleSchema from 'simpl-schema';
import Goods from 'collections/goods';

Meteor.methods({
  'goods.addGood': ({goodId, vendorCode, price, ...rest}) => (
    Goods.insert({_id: goodId, vendorCode: Number(vendorCode), price: Number(price), ...rest})
  ),
});
