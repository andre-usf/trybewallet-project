import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>Header</div>
        <div><p data-testid="email-field">{email}</p></div>
        <div><p data-testid="total-field">0</p></div>
        <div><p data-testid="header-currency-field">BRL</p></div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
