import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../../shared/models/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.isLoggedIn);

export const selectUserId = createSelector(selectAuthState, (state) => state.userId);

export const selectUserEmail = createSelector(selectAuthState, (state) => state.email);
