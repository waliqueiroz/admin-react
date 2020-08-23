/* eslint-disable camelcase */
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  signed: boolean;
}

export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const SIGN_FALIURE = '@auth/SIGN_FALIURE';
export const SIGN_OUT = '@auth/SIGN_OUT';

interface SignInRequestAction {
  type: typeof SIGN_IN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

interface SignFaliureAction {
  type: typeof SIGN_FALIURE;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type AuthActionTypes =
  | SignInRequestAction
  | SignInSuccessAction
  | SignFaliureAction
  | SignOutAction;
