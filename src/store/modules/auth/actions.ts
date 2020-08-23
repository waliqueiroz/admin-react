import {
  AuthActionTypes,
  User,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_FALIURE,
  SIGN_OUT,
} from './types';

export function signInRequest(
  email: string,
  password: string,
): AuthActionTypes {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token: string, user: User): AuthActionTypes {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signFaliure(): AuthActionTypes {
  return {
    type: SIGN_FALIURE,
  };
}

export function signOut(): AuthActionTypes {
  return {
    type: SIGN_OUT,
  };
}
