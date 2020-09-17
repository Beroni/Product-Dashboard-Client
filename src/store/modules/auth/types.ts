export interface IUserState {
  name: string;
  email: string;
}

export interface IAuthState {
  user: IUserState;
  token: string;
}
