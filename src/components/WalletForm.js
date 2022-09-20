import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies from '../services/fetchCurrencies';
import { getCurrencies } from '../redux/actions/currencyActions';
import { salvaDespesa } from '../redux/actions/addExpensesActions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;

    const currencies = await fetchCurrencies();
    dispatch(getCurrencies(currencies));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = (event) => {
    event.preventDefault();
    // console.log(this.props);
    const { dispatch } = this.props;
    dispatch(salvaDespesa(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  // COM AJUDA COM VICTOR MATIAS
  render() {
    const { currencies } = this.props;
    // console.log(currencies);
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="expense">
            Despesa:
            <input
              type="number"
              name="value"
              id="inputExpense"
              data-testid="value-input"
              placeholder="Digite sua despesa"
              onChange={ this.handleChange }
              value={ value }
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
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="select">
            Moeda:
            <select
              onChange={ this.handleChange }
              data-testid="currency-input"
              name="currency"
              value={ currency }
            >
              {currencies.map((e) => (
                <option key={ e }>
                  {' '}
                  { e }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="select">
            Forma de pagamento:
            <select
              onChange={ this.handleChange }
              data-testid="method-input"
              name="method"
              value={ method }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="select">
            Categoria:
            <select
              onChange={ this.handleChange }
              data-testid="tag-input"
              name="tag"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
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

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
