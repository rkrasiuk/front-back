import Goods from 'collections/goods';

Meteor.publish('goods.list', () => Goods.find({}));
