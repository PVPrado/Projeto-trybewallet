export const GET_CURRENCIES = 'GET_CURRENCIES';

export const getCurrencies = (coin) => ({
  type: GET_CURRENCIES,
  payload: coin,
});
