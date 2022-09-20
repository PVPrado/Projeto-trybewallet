import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Tela de login', () => {
  it('Testa os elementos da tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const textEmail = screen.getByText(/Email:/i);
    expect(textEmail).toBeInTheDocument();

    const textSenha = screen.getByText(/Senha/i);
    expect(textSenha).toBeInTheDocument();

    const placeholderEmail = screen.getByPlaceholderText(/Digite seu email/i);
    expect(placeholderEmail).toBeInTheDocument();

    const placeholderSenha = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(placeholderSenha).toBeInTheDocument();

    const email = 'paulo@trybe.com';
    const inputEmail = screen.getByTestId(/email-input/i);
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, email);
    expect(inputEmail).toHaveValue(email);

    const inputPassword = screen.getByTestId(/assword-input/i);
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveValue('123456');

    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Tela da wallet', () => {
  it('Testa o header do wallet padrão', () => {
    const initialState = {
      user: {
        email: 'paulo.v.prado@hotmail.com',
      },
      wallet: {
        currencies: [
          'USD',
        ],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    // history.push('/carteira');

    const textUser = screen.getByText(/paulo.v.prado/);
    expect(textUser).toBeInTheDocument();

    const textValue = screen.getByText(/0.00/i);
    expect(textValue).toBeInTheDocument();

    const textBRL = screen.getByText(/BRL/i);
    expect(textBRL).toBeInTheDocument();
  });

  it('Testa o formulario do wallet', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId(/value-input/i);
    const inputDescription = screen.getByTestId(/description-input/i);
    const inputCurrency = screen.getByTestId(/currency-input/i);
    const inputMethod = screen.getByTestId(/method-input/i);
    const inputTag = screen.getByTestId(/tag-input/i);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '150');
    userEvent.type(inputDescription, 'fone');
    await waitFor(() => {
      userEvent.selectOptions(inputCurrency, ['BTC']);
    });
    userEvent.selectOptions(inputMethod, ['Dinheiro']);
    userEvent.selectOptions(inputTag, ['Lazer']);
    userEvent.click(addButton);

    const descriptionCell = await screen.findByRole('cell', { name: /fone/i });
    const valueCell = await screen.findByRole('cell', { name: '150.00' });
    const currencyCell = await screen.findByRole('cell', { name: /bitcoin/i });
    const methodCell = await screen.findByRole('cell', { name: /Dinheiro/i });
    const tagCell = await screen.findByRole('cell', { name: /Lazer/i });

    expect(descriptionCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(currencyCell).toBeInTheDocument();
    expect(methodCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();
  });

  // Com ajuda do meu primo
  it('Testa se e possivel deletar a despesa', async () => {
    const initialState = {
      user: {
        email: 'paulo.v.prado@hotmail.com',
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
        expenses: [
          {
            value: '150',
            description: 'fone',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Lazer',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.2234',
                low: '5.1414',
                varBid: '-0.0007',
                pctChange: '-0.01',
                bid: '5.1661',
                ask: '5.1666',
                timestamp: '1663695168',
                create_date: '2022-09-20 14:32:48',
              },
            },
            id: 0,
          },
        ],
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const totalAmountExpenses = await screen.findByTestId(/total-field/i);
    const descriptionCell = await screen.findByRole('cell', { name: /fone/i });
    const valueCell = await screen.findByRole('cell', { name: /150/i });
    const currencyCell = await screen.findByRole('cell', { name: /Dólar americano/i });
    const methodCell = await screen.findByRole('cell', { name: /Dinheiro/i });
    const tagCell = await screen.findByRole('cell', { name: /Lazer/i });

    expect(totalAmountExpenses.innerHTML).toBe('774.99');
    expect(descriptionCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(currencyCell).toBeInTheDocument();
    expect(methodCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /Excluir/i });
    expect(deleteBtn).toBeInTheDocument();
    userEvent.click(deleteBtn);

    expect(totalAmountExpenses.innerHTML).toBe('0.00');
    expect(descriptionCell).not.toBeInTheDocument();
    expect(valueCell).not.toBeInTheDocument();
    expect(currencyCell).not.toBeInTheDocument();
    expect(methodCell).not.toBeInTheDocument();
    expect(tagCell).not.toBeInTheDocument();
  });
});
