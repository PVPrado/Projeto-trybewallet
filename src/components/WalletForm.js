import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrency from '../redux/actions/currencyActions';

class WalletForm extends Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { coin } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="expense">
            Despesa:
            <input
              type="number"
              name="expense"
              id="inputExpense"
              data-testid="value-input"
              placeholder="Digite sua despesa"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="inputDescription"
              data-testid="description-input"
              placeholder="Digite uma descrição"
            />
          </label>
          <label htmlFor="select">
            Moeda:
            <select data-testid="currency-input" name="select">
              {coin.map((e) => (
                <option key={ e }>
                  {' '}
                  { e }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="select">
            Forma de pagamento:
            <select data-testid="method-input" name="select">
              <option value="metodo1">Dinheiro</option>
              <option value="metodo1">Cartão de crédito</option>
              <option value="metodo1">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="select">
            Categoria:
            <select data-testid="tag-input" name="select">
              <option value="categoria1">Alimentação</option>
              <option value="categoria2">Lazer</option>
              <option value="categoria3">Trabalho</option>
              <option value="categoria4">Transporte</option>
              <option value="categoria5">Saúde</option>
            </select>
          </label>
          <button
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  coin: PropTypes.any,
  currencies: PropTypes.any,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({ coin: state.wallet.currencies });

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
