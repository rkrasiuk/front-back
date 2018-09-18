import React, {Component} from 'react';

import './index.scss';

// TODO use framework form
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  login = (e) => {
    e.preventDefault();
    const {login, password} = this.state;
    Meteor.loginWithPassword(login, password);
  };

  render() {
    const {login, password} = this.state;
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.login}>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={({target: {value}}) => this.setState({login: value})}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={({target: {value}}) => this.setState({password: value})}
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
