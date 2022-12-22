import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';
import deleteButton from '../img/delete-button.png';
import editButton from '../img/edit-button.png';

class Table extends Component {
  handleClickDelete = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(Number(target.parentNode.parentNode.parentNode.id)));
  };

  handleClickEdit = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(Number(target.parentNode.parentNode.parentNode.id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="flex items-center justify-center w-full">
        <table
          className="table-auto rounded-md bg-[#003BE5] text-white w-10/12 shadow-lg
          border-collapse divide-y"
        >
          <thead>
            <tr className="divide-x divide-white">
              <th className="p-2">Descrição</th>
              <th className="p-2">Tag</th>
              <th className="p-2">Método de pagamento</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Moeda</th>
              <th className="p-2">Câmbio utilizado</th>
              <th className="p-2">Valor convertido</th>
              <th className="p-2">Moeda de conversão</th>
              <th className="p-2">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {expenses.map((expense) => (
              <tr key={ expense.id } id={ expense.id } className="">
                <td className="p-2">
                  {expense.description}
                </td>
                <td className="p-2">
                  {expense.tag}
                </td>
                <td className="p-2">
                  {expense.method}
                </td>
                <td className="p-2">
                  {Number(expense.value).toFixed(2)}
                </td>
                <td className="p-2">
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td className="p-2">
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td className="p-2">
                  {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td className="p-2">
                  Real
                </td>
                <td className="p-2">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="m-2"
                    onClick={ this.handleClickEdit }
                  >
                    <img src={ editButton } alt="delete button" />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="m-2"
                    onClick={ this.handleClickDelete }
                  >
                    <img src={ deleteButton } alt="delete button" />
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
