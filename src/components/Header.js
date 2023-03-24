import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoLogin from '../img/logo-login.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const totalExpenses = expenses.reduce((acc, expense) => (
      expense.exchangeRates[expense.currency].ask
      * expense.value) + acc, 0);

    return (
      <header>
        <div
          className="flex items-center justify-center space-x-4
          p-3 bg-slate-100"
        >
          <img className="my-7" src={ logoLogin } alt="login logo" />
          <p
            data-testid="total-field"
            className="text-[#003BE5] font-semibold mt-3"
          >
            {`Total de despesas: ${totalExpenses.toFixed(2)}`}
          </p>
          <p
            data-testid="header-currency-field"
            className="text-[#003BE5] font-semibold mt-3"
          >
            BRL
          </p>
          <p
            data-testid="email-field"
            className="text-[#2FC18C] font-semibold mt-3"
          >
            {email}
          </p>
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
