import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

const initialState = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
  },
};

const TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

describe('Testa o componente WalletForm', () => {
  test('Verifica se há um input "Valor" do tipo "number" ', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input = screen.queryByLabelText(/valor/i);
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('number');
  });
  test('Verifica se há um select "Moeda" com as opções definidas" ', () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState });
    const input = screen.getByTestId('currency-input');
    expect(input).toBeInTheDocument();
    initialState.wallet.currencies.forEach((currency) => {
      const option = screen.getByText(currency);
      expect(option).toBeInTheDocument();
    });
  });
  test('Verifica se há um select "Método de pagamento" com as opções definidas" ', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input = screen.getByTestId('method-input');
    expect(input).toBeInTheDocument();
    METHOD.forEach((method) => {
      const option = screen.getByText(method);
      expect(option).toBeInTheDocument();
    });
  });
  test('Verifica se há um select "Categoria" com as opções definidas" ', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input = screen.getByTestId('tag-input');
    expect(input).toBeInTheDocument();
    TAG.forEach((tag) => {
      const option = screen.getByText(tag);
      expect(option).toBeInTheDocument();
    });
  });
  test('Verifica se há um input "Descrição" do tipo "text" ', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input = screen.queryByLabelText(/descrição/i);
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
  });
});
