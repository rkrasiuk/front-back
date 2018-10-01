import SimpleSchema from 'simpl-schema';
import Goods from 'collections/goods';

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
});
