import React, {Component} from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import App from './app';
import Login from './login';
import Competitor from './app/Competitor';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Meteor.user(),
      loading: Meteor.loggingIn(),
    };
    Accounts.onLogin(() => this.setState({user: Meteor.user(), loading: false}));
    Accounts.onLogout(() => this.setState({user: null, loading: false}));
  }

  renderPrivateRoutes() {
    return (
      <Switch>
        <Route path="/competitor/:id" component={Competitor} />
        <Route path="/" component={App} />
      </Switch>
    );
  }

  renderPublicRoutes() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect from="*" to="/login" />
      </Switch>
    );
  }

  render() {
    const {user, loading} = this.state;

    if (loading) {
      return null; // TODO loader
    }

    return (
      <Router>
        {user ? this.renderPrivateRoutes() : this.renderPublicRoutes()}
      </Router>
    );
  }
}

export default AppRouter;
