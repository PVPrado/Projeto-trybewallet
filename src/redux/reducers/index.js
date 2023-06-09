import { combineReducers } from 'redux';
import loginReducer from './user';
import walletReducer from './wallet';

const rootReducer = combineReducers({
  user: loginReducer,
  wallet: walletReducer,
});
export default rootReducer;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
