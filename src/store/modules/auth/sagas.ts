/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { SignInRequestAction, AuthTypes } from './types';
import { signInSuccess } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn(action: SignInRequestAction) {
  try {
    const { email, password } = action.payload;

    const response = yield call(api.post, 'login', { email, password });

    if (response.status === 401) {
      toast.error(
        'Credenciais inválidas, verifique seus dados e tente novamenete.',
      );
      return;
    }

    const { access_token: token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const user = yield call(api.get, 'user');

    yield put(signInSuccess(token, user.data));

    history.push('/');
  } catch (error) {
    if (error.response.status === 401) {
      if (
        error.response.data.message &&
        !error.response.data.message.includes('Unauthenticated')
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Usuário ou senha inválidos');
      }
    }
  }
}

export function setToken(action: RehydrateAction) {
  if (!action.payload) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { token } = (<any>action).payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest(REHYDRATE, setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
