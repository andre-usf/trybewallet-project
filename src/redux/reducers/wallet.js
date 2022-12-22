import { REQUEST_CURRENCIES,
  RESPONSE_CURRENCIES_SUCCESS,
  RESPONSE_CURRENCIES_ERROR,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
} from '../actions/index';

export const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

function walletReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state };
  case RESPONSE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload)
        .filter((currencyItem) => currencyItem !== 'USDT'),
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id
      !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          expense = action.payload;
          return expense;
        }
        return expense;
      }),
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
}

export default walletReducer;
