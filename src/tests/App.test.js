import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const EMAIL_TEST = 'teste@teste.com';

const initialState = {
  user: {
    email: EMAIL_TEST,
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

describe('Testa o componente App e suas rotas', () => {
  test('Verifica se, ao digitar um email e senha válidos e clicar no botão "entrar", o usuário é direcionado ao path "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, EMAIL_TEST);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
  test('Verifica se, após o login, o Header possui o email utilizado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, EMAIL_TEST);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toHaveTextContent('teste@teste.com');
  });
  test('Verifica se, ao adicionar uma despesa, o valor total do componente Header é atualizado', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const valor = screen.getByTestId('value-input');
    const moeda = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.type(valor, '10');
    userEvent.selectOptions(moeda, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Alimentação');
    userEvent.type(description, 'Despesa teste');
    await act(() => {
      userEvent.click(button);
    });
    const total = screen.getByTestId('total-field');
    expect(total).toHaveTextContent('47.53');
  });
});
