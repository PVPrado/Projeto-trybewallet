import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// toFixed(valor a ser pegado pos virgula)

class Header extends Component {
  sumExpense = (expenses) => (
    // console.log(expenses[0].value);
    // console.log(expenses[0].currency);
    // console.log(expenses[0].exchangeRates[expenses[0].currency].ask);
    expenses.reduce((acc, curr) => {
      const { value, currency } = curr;
      const exchange = curr.exchangeRates[currency].ask;
      const mult = value * exchange;
      acc += mult;
      // console.log(acc);
      return acc;
    }, 0)
  );

  render() {
    const { user, expenses } = this.props;
    const valorTotal = expenses.length ? this.sumExpense(expenses) : 0.00;
    return (
      <header>
        <p data-testid="email-field">
          Usuário:
          {' '}
          { user }
        </p>
        <p data-testid="total-field">
          { valorTotal.toFixed(2) }
          R$
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.any,
  expenses: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(Header);
