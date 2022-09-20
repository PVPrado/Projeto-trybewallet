import { ADD_EXPENSE } from '../actions/addExpensesActions';
import { GET_CURRENCIES } from '../actions/currencyActions';
import { DELETE_EXPENSE } from '../actions/deleteExpenseActions';

const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const addCotacao = (expense, currencies) => {
  const currenciesReduce = Object.entries(currencies)
    .reduce((acc, curr) => {
      const [name, info] = curr;
      acc[name] = info;
      return acc;
    }, {});
  expense.exchangeRates = currenciesReduce;
  return expense;
};

const addId = (expenses) => (
  expenses.reduce((acc, curr, index) => {
    curr.id = index;
    acc.push(curr);
    return acc;
  }, [])
);

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    delete action.payload.USDT;
    const currencies = Object.keys(action.payload);
    return {
      ...state,
      currencies,
    };
  }
  case ADD_EXPENSE: {
    const newArray = [...state.expenses, addCotacao(
      action.payload.expense,
      action.payload.currencies,
    )];
    return {
      ...state,
      expenses: addId(newArray),
    };
  }
  case DELETE_EXPENSE: {
    const { expenses } = state;
    const expenseFilter = expenses.filter((expense) => expense.id !== action.id);
    return { ...state, expenses: expenseFilter };
  }
  case 'IDTOEDIT':
    return {
      ...state,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
