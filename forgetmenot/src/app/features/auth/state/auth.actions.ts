import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[AUTH] Login Request',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[AUTH] Login Success',
  props<{ userId: string; email: string }>(),
);

export const signUpRequest = createAction(
  '[AUTH] Sign Up Request',
  props<{ email: string; password: string }>(),
);

export const signUpSuccess = createAction(
  '[AUTH] Sign Up Success',
  props<{ userId: string; email: string }>(),
);

export const loginFailure = createAction('[AUTH] Login Failed', props<{ error: string }>());

export const logOutRequest = createAction('[AUTH] Logout Request');

export const logOutSuccess = createAction('[AUTH] Logout Success');
