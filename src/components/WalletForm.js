import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi,
  fetchCurrencies,
  saveExpenses,
  saveEditExpense } from '../redux/actions/index';
import Table from './Table';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  setID = () => {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      this.setState((prevState) => ({ id: prevState.id + 1 }));
    }
  };

  setExchangeRates = async () => {
    const currenciesData = await fetchApi();
    this.setState({ exchangeRates: currenciesData }, () => {
      this.dispatchSaveExpenses();
    });
  };

  dispatchSaveExpenses = () => {
    const { dispatch } = this.props;
    dispatch(saveExpenses(this.state));
    this.setState({ value: '', description: '' });
  };

  handleClick = async () => {
    this.setID();
    await this.setExchangeRates();
  };

  handleClickEditor = async () => {
    const { dispatch, idToEdit } = this.props;
    this.setState({ id: idToEdit }, () => {
      dispatch(saveEditExpense(this.state));
      this.setState({ value: '', description: '' });
    });
  };

  render() {
    const TAG_OPTIONS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const METHOD_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <div className="h-screen bg-slate-100 flex flex-col items-center w-full">
        <form
          className="flex flex-col items-center rounded-t-md
          justify-center p-5 bg-[#2FC18C] w-8/12 gap-4"
        >
          <div className="text-[#003BE5] font-semibold">
            <label htmlFor="description">
              {'Descrição '}
              <input
                id="description"
                type="text"
                data-testid="description-input"
                name="description"
                className="border-2 rounded-md border-[#003BE5] bg-[#2FC18C] mr-5
                focus:outline-none focus:border-[#003BE5]
                focus:ring-1 focus:ring-[#003BE5] font-normal p-1"
                onChange={ this.handleChange }
                value={ description }
              />
            </label>
            <label htmlFor="tag">
              {'Categoria '}
              <select
                id="tag"
                name="tag"
                data-testid="tag-input"
                className="border-2 rounded-md border-[#003BE5] bg-[#2FC18C] mr-5
                focus:outline-none focus:border-[#003BE5]
                focus:ring-1 focus:ring-[#003BE5] font-normal p-1"
                onChange={ this.handleChange }
                value={ tag }
              >
                {
                  TAG_OPTIONS.map((tagItem, index) => (
                    <option key={ index }>
                      { tagItem }
                    </option>
                  ))
                }
              </select>
            </label>

          </div>

          <div className="text-[#003BE5] font-semibold">
            <label htmlFor="value">
              {'Valor '}
              <input
                id="value"
                type="number"
                data-testid="value-input"
                name="value"
                className="border-2 rounded-md border-[#003BE5] bg-[#2FC18C] mr-5
                focus:outline-none focus:border-[#003BE5]
                focus:ring-1 focus:ring-[#003BE5] font-normal p-1"
                onChange={ this.handleChange }
                value={ value }
              />
            </label>

            <label htmlFor="method">
              {'Método de pagamento '}
              <select
                id="method"
                name="method"
                data-testid="method-input"
                className="border-2 rounded-md border-[#003BE5] bg-[#2FC18C] mr-5
                focus:outline-none focus:border-[#003BE5]
                focus:ring-1 focus:ring-[#003BE5] font-normal p-1"
                onChange={ this.handleChange }
                value={ method }
              >
                {
                  METHOD_OPTIONS.map((methodItem, index) => (
                    <option key={ index }>
                      { methodItem }
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="currency">
              {'Moeda '}
              <select
                id="currency"
                name="currency"
                data-testid="currency-input"
                className="border-2 rounded-md border-[#003BE5] bg-[#2FC18C] mr-5
                focus:outline-none focus:border-[#003BE5]
                focus:ring-1 focus:ring-[#003BE5] font-normal p-1"
                onChange={ this.handleChange }
                value={ currency }
              >
                {
                  currencies.filter((currencyItem) => currencyItem !== 'USDT')
                    .map((currencyItem, index) => (
                      <option key={ index }>
                        { currencyItem }
                      </option>
                    ))
                }
              </select>
            </label>

          </div>

          <div className="flex justify-center w-full">
            {editor
              ? (
                <button
                  type="button"
                  className="rounded-md bg-slate-100 font-semibold text-[#003BE5]
                  mt-3 p-2 w-1/3
                  hover:bg-[#003BE5] hover:text-white"
                  onClick={ this.handleClickEditor }
                >
                  Editar despesa
                </button>)
              : (
                <button
                  type="button"
                  className="rounded-md bg-slate-100 font-semibold text-[#003BE5]
                  mt-3 p-2 w-1/3
                  hover:bg-[#003BE5] hover:text-white"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>)}
          </div>
        </form>

        <Table />
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editor: store.wallet.editor,
  idToEdit: store.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
