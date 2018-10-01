import React, {Component} from 'react';

import Input from 'components/Input';

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
          <div className="login-inputs">
            <Input
              placeholder="Login"
              value={login}
              onChange={value => this.setState({login: value})}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={value => this.setState({password: value})}
            />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
