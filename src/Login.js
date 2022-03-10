import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      nameLogin: '',
      loading: false,
      redirect: false,
    };
  }

  buttonAble = (event) => {
    const nameInput = event.target.value;
    const three = 3;
    if (nameInput.length >= three) {
      this.setState({ buttonDisabled: false, nameLogin: nameInput });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  callCreateUser = () => {
    const { nameLogin } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name: nameLogin })
        .then(() => this.setState({ redirect: true, loading: false }));
    });
  };

  render() {
    const { buttonDisabled, nameLogin, redirect, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name={ nameLogin }
              data-testid="login-name-input"
              onChange={ this.buttonAble }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.callCreateUser }
          >
            Entrar
          </button>
          { loading && (redirect === false) ? <Redirect to="/Loading" />
            : <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
