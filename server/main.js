import {Goods, Competitors} from 'collections';

Meteor.publish('goods.list', () => Goods.find({}));
Meteor.publish('competitors.list', () => Competitors.find({}));

Accounts.config({
  loginExpirationInDays: 1,
});

Meteor.startup(async () => {
  const admin = Accounts.findUserByUsername('admin');
  const {ADMIN_PASSWORD = 'admin'} = process.env;

  if (admin) {
    await Accounts.setPassword(admin._id, ADMIN_PASSWORD);
  } else {
    await Accounts.createUser({
      username: 'admin', password: ADMIN_PASSWORD, email: 'admin@example.com', profile: {},
    });
  }
});
