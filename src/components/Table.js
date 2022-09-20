import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions/deleteExpenseActions';

const header = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

// COM AJUDA DO DIEGHO MORAES

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { header.map((h) => <th key={ h }>{ h }</th>) }
          </tr>
        </thead>
        <tbody>
          { expenses.map((e) => (
            <tr key={ e.id }>
              <td>{ e.description }</td>
              <td>{ e.tag }</td>
              <td>{ e.method }</td>
              <td>{ Number(e.value).toFixed(2) }</td>
              <td>{ e.exchangeRates[e.currency].name }</td>
              <td>{ Number(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
              <td>
                { (e.exchangeRates[e.currency].ask
                   * e.value).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                >
                  Editar
                </button>
                <button
                  id={ e.id }
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => dispatch(deleteExpense(e.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(Table);
