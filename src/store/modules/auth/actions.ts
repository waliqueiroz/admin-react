import { AuthActionTypes, User, AuthTypes } from './types';

export function signInRequest(
  email: string,
  password: string,
): AuthActionTypes {
  return {
    type: AuthTypes.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token: string, user: User): AuthActionTypes {
  return {
    type: AuthTypes.SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signOut(): AuthActionTypes {
  return {
    type: AuthTypes.SIGN_OUT,
  };
}
