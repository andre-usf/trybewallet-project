// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES,
  RESPONSE_CURRENCIES_SUCCESS,
  RESPONSE_CURRENCIES_ERROR,
  SAVE_EXPENSES,
} from '../actions/index';

export const INITIAL_STATE_WALLET = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: null,
};

function walletReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state };
  case RESPONSE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case RESPONSE_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
