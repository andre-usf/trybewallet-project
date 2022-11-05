import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Teste o componente App e suas rotas', () => {
  test('Verifica se, ao digitar um email e senha válidos e clicar no botão "entrar", o usuário é direcionado ao path "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, 'teste@teste.com');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
