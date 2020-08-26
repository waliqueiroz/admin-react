/* eslint-disable camelcase */
export interface User {
  id: number;
  name: string;
  email: string;
  roles: Array<string>;
  permissions: Array<string>;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  signed: boolean;
}

export enum AuthTypes {
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_FALIURE = '@auth/SIGN_FALIURE',
  SIGN_OUT = '@auth/SIGN_OUT',
}

export interface SignInRequestAction {
  type: typeof AuthTypes.SIGN_IN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface SignInSuccessAction {
  type: typeof AuthTypes.SIGN_IN_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

export interface SignOutAction {
  type: typeof AuthTypes.SIGN_OUT;
}

export type AuthActionTypes =
  | SignInRequestAction
  | SignInSuccessAction
  | SignOutAction;
