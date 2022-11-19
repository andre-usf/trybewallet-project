import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validatePasswordLength = () => {
    const PASSWORD_MIN_LENGTH = 6;
    const { password } = this.state;
    return password.length >= PASSWORD_MIN_LENGTH;
  };

  validateEmail = () => {
    const { email } = this.state;
    const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    return email.match(regexEmail);
  };

  validateLogin = () => this.validateEmail() && this.validatePasswordLength();

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div
        className="border-2 bg-slate-100
        flex flex-col items-center justify-center h-screen"
      >
        <h1 className="my-7 font-semibold text-4xl text-green-800 ">
          TRYBEWALLET
        </h1>
        <div
          className="bg-green-300 rounded-lg flex flex-col
        items-center justify-center h-1/3 w-1/3 shadow-2xl"
        >
          <h3 className="mb-3">Entre na sua conta:</h3>
          <input
            className="border-2 bg-slate-100 rounded-md
            hover:border-green-800 mt-3 p-1 w-2/3
            placeholder:italic placeholder:text-slate-400
            placeholder:text-sm placeholder:antialiased"
            type="text"
            data-testid="email-input"
            name="email"
            placeholder="  Seu e-mail..."
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            className="border-2 bg-slate-100 rounded-md
            hover:border-green-800 mt-3 p-1 w-2/3
            placeholder:italic placeholder:text-slate-400
            placeholder:text-sm antialiased"
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="  Sua senha..."
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            className="rounded-md bg-slate-100 font-semibold text-green-800
            hover:bg-green-800
            hover:text-white mt-5 p-1 w-1/3
            disabled:bg-slate-200 disabled:text-slate-400"
            type="button"
            disabled={ !this.validateLogin() }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
