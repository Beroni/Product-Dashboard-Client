import { all, takeLatest, select } from 'redux-saga/effects';
import { UserSignIn } from './actions';
import { IState } from '../..';

type saveTokenRequest = ReturnType<typeof UserSignIn>;

function* saveToken({ payload, type }: saveTokenRequest) {
  const currentToken: string = yield select((state: IState) => {
    return state.auth?.token;
  });

  localStorage.setItem('@GettyIO/TOKEN', currentToken);
}

function* deleteToken() {
  localStorage.setItem('@GettyIO/TOKEN', '');
  yield;
}

export default all([
  takeLatest('SIGN_IN_USER', saveToken),
  takeLatest('SIGN_OUT_USER', deleteToken),
]);
