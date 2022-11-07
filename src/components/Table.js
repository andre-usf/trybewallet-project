import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleClickDelete = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(Number(target.parentNode.parentNode.id)));
  };

  handleClickEdit = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(Number(target.parentNode.parentNode.id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id } id={ expense.id }>
                <td>
                  {expense.description}
                </td>
                <td>
                  {expense.tag}
                </td>
                <td>
                  {expense.method}
                </td>
                <td>
                  {Number(expense.value).toFixed(2)}
                </td>
                <td>
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ this.handleClickEdit }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.handleClickDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
