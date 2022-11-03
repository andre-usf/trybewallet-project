// ACTION USER LOGIN
export const USER_LOGIN = 'USER_LOGIN';

export const login = (value) => ({ type: USER_LOGIN, payload: value });

// ACTIONS FETCH CURRENCIES
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RESPONSE_CURRENCIES_SUCCESS = 'RESPONSE_CURRENCIES_SUCCESS';
export const RESPONSE_CURRENCIES_ERROR = 'RESPONSE_CURRENCIES_ERROR';

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const responseCurrenciesSuccess = (currencies) => ({
  type: RESPONSE_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const responseCurrenciesError = (error) => ({
  type: RESPONSE_CURRENCIES_ERROR,
  error,
});

export async function fetchApi() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return json;
}

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies);
    try {
      const json = await fetchApi();
      dispatch(responseCurrenciesSuccess(json));
    } catch (error) {
      dispatch(responseCurrenciesError(error));
    }
  };
}

// ACTION SAVE EXPENSES
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expense) => ({ type: SAVE_EXPENSES, payload: expense });
