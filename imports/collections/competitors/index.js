import SimpleSchema from 'simpl-schema';

const Competitors = new Mongo.Collection('competitors');

const competitorSchema = new SimpleSchema({
  name: String,
  parsingRules: String,
});

Competitors.attachSchema(competitorSchema);

export default Competitors;
