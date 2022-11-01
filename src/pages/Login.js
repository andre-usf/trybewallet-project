import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import login from '../redux/actions/index';

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
      <>
        <div>Login</div>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ !this.validateLogin() }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </>
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
