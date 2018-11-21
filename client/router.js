import React, {Component} from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={() => <div />} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
