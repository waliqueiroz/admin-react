/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { SignInRequestAction, AuthTypes, SetTokenAction } from './types';
import { signInSuccess } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn(action: SignInRequestAction) {
  try {
    const { email, password } = action.payload;

    const response = yield call(api.post, 'login', { email, password });

    const { access_token: token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const user = yield call(api.get, 'user');

    yield put(signInSuccess(token, user.data));

    history.push('/');
  } catch (error) {
    toast.error(
      'Credenciais inválidas, verifique seus dados e tente novamente.',
    );
  }
}

export function setToken(action: RehydrateAction | SetTokenAction) {
  if (!action.payload) return;
  let token = '';

  if (action.type === REHYDRATE) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    token = (action as any).payload.auth.token;
  } else {
    token = action.payload.token;
  }

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest(REHYDRATE, setToken),
  takeLatest(AuthTypes.SET_TOKEN, setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
