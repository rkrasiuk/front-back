import React, {Component} from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import GoodsPage from './app';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/goods" component={GoodsPage} />
          <Redirect from="*" to="/goods" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
