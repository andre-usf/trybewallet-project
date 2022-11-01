import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const TAG_OPTIONS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const METHOD_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies } = this.props;

    return (
      <>
        <div>WalletForm</div>
        <form>

          <label htmlFor="valor">
            Valor:
            <input
              id="valor"
              type="number"
              data-testid="value-input"
              name="valor"
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              name="moeda"
              data-testid="currency-input"
            >
              {
                currencies.map((currencie, index) => (
                  <option key={ index }>
                    { currencie }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="pagamento">
            Método de pagamento:
            <select
              id="pagamento"
              name="pagamento"
              data-testid="method-input"
            >
              {
                METHOD_OPTIONS.map((method, index) => (
                  <option key={ index }>
                    { method }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="categoria">
            Categoria:
            <select
              id="categoria"
              name="categoria"
              data-testid="tag-input"
            >
              {
                TAG_OPTIONS.map((tag, index) => (
                  <option key={ index }>
                    { tag }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="descricao">
            Descrição:
            <input
              id="descricao"
              type="text"
              data-testid="description-input"
              name="descricao"
            />
          </label>

        </form>
      </>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
