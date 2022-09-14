// const seila = async () => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await response.json();
//   delete data.USDT;
//   console.log(data);
//   return data;
// };

const currencyAction = (coin) => ({
  type: 'CURRENCIES',
  payload: coin,
});

export default function fetchCurrency() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      const arrayData = Object.keys(data);
      dispatch(currencyAction(arrayData));
    } catch (error) {
      console.log('erro');
    }
  };
}
