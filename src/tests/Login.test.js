import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Testa o componente Login', () => {
  test('Verifica a existência de um input do tipo texto', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('text');
  });
  test('Verifica a existência de um input do tipo password', () => {
    renderWithRouterAndRedux(<Login />);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');
  });
  test('Verifica se o botão "entrar" inicia desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  test('Verifica se, ao digitar um email e senha válidos, o botão "entrar" é habilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, 'teste@teste.com');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeEnabled();
  });
  test('Verifica se, ao digitar um email e senha inválidos, o botão "entrar" está desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, 'teste@com');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '12356');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
  });
});
