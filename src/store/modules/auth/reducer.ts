import produce from 'immer';
import { AuthState, AuthTypes, AuthActionTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
  signed: false,
};

export default function auth(
  state = INITIAL_STATE,
  action: AuthActionTypes,
): AuthState {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_SUCCESS:
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.signed = true;
        break;
      case AuthTypes.SIGN_OUT:
        draft.token = null;
        draft.user = null;
        draft.signed = false;
        break;
      case AuthTypes.SET_TOKEN:
        draft.token = action.payload.token;
        break;
      default:
    }
  });
}
