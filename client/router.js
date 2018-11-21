import React, {Component} from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Application from './app';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Application} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
