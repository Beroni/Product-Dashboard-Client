import { Reducer } from 'redux';
import produce from 'immer';
import { IAuthState } from './types';

const INITIAL_STATE: IAuthState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
};

const auth: Reducer<IAuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'SIGN_IN_USER': {
        const { user, token } = action.payload.auth;

        draft.user = user;
        draft.token = token;

        return draft;
      }
      case 'SIGN_OUT_USER': {
        draft.user = INITIAL_STATE.user;
        draft.token = INITIAL_STATE.token;
        return draft;
      }

      default:
        return draft;
    }
  });
};

export default auth;
