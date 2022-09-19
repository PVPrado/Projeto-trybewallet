import fetchCurrencies from '../../helpers/fetchCurrencies';

export const ADD_EXPENSE = 'ADD_EXPENSE';

const addExpense = (expense, currencies) => ({
  type: ADD_EXPENSE,
  payload: {
    expense,
    currencies,
  },
});

export const salvaDespesa = (expense) => (
  async (dispacth) => {
    try {
      const response = await fetchCurrencies();
      // console.log(response);
      dispacth(addExpense(expense, response));
    } catch (error) {
      console.log(error);
    }
  }
);
