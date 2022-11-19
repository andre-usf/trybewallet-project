import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const totalExpenses = expenses.reduce((acc, expense) => (
      expense.exchangeRates[expense.currency].ask
      * expense.value) + acc, 0);

    return (
      <header>
        <h1>Header</h1>
        <div className="flex space-x-4">
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  totalField: store.wallet.totalField,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
