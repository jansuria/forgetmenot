import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../../shared/models/auth.model';
import * as authActionTypes from './auth.actions';

export const initialState: AuthState = {
  userId: null,
  email: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActionTypes.loginSuccess, (state, { userId, email }) => ({
    ...state,
    userId,
    email,
    isLoggedIn: true,
  })),
  on(authActionTypes.logOutSuccess, () => initialState),
);
