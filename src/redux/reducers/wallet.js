// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE_WALLET = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

function loginReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default loginReducer;
