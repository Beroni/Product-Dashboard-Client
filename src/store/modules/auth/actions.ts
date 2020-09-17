import { IAuthState } from './types';

export function UserSignIn(auth: IAuthState) {
  return {
    type: 'SIGN_IN_USER',
    payload: {
      auth,
    },
  };
}

export function UserSignOut() {
  return {
    type: 'SIGN_OUT_USER',
    payload: {},
  };
}
