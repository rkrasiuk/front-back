import React, {Component} from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Goods from './app/Goods';
import Competitors from './app/Competitors';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/goods" component={Goods} />
          <Route path="/competitors" component={Competitors} />
          <Redirect from="*" to="/goods" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
