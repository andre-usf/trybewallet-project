// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_LOGIN } from '../actions';

const INITIAL_STATE_USER = {
  email: '', // string que armazena o email da pessoa usuária
};

function loginReducer(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
}

export default loginReducer;
