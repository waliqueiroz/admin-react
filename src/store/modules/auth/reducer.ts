import produce from 'immer';
import {
  AuthState,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_FALIURE,
  SIGN_OUT,
  AuthActionTypes,
} from './types';

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
  signed: false,
  loading: false,
};

export default function auth(
  state = INITIAL_STATE,
  action: AuthActionTypes,
): AuthState {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_IN_REQUEST:
        draft.loading = true;
        break;
      case SIGN_IN_SUCCESS:
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      case SIGN_FALIURE:
        draft.loading = false;
        break;
      case SIGN_OUT:
        draft.token = null;
        draft.signed = false;
        break;
      default:
    }
  });
}
