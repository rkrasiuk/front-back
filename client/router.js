import React, {Component} from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Goods from './app/Goods';
import Competitors from './app/Competitors';
import Competitor from './app/Competitor';
import Report from './app/Report';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/goods" component={Goods} />
          <Route path="/competitor/:id" component={Competitor} />
          <Route path="/competitors" component={Competitors} />
          <Route path="/report" component={Report} />
          <Redirect from="*" to="/goods" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
