// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE_USER = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

function walletReducer(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default walletReducer;
