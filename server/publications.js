import Goods from 'collections/goods';
import Competitors from 'collections/competitors';
import CompetitorGoods from 'collections/competitorgoods';
import ParsedGoods from 'collections/parsedgoods';

Meteor.publish('goods.list', () => Goods.find({}));
Meteor.publish('competitors.list', () => Competitors.find({}));
Meteor.publish('competitorgoods.list', () => CompetitorGoods.find({}));
Meteor.publish('parsedgoods.list', () => ParsedGoods.find({}));
