import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SupabaseService } from '../../../core/services/supabase';
import * as authActionTypes from './auth.actions';
import { catchError, concatMap, from, map, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly supabaseApi = inject(SupabaseService);

  signUpEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActionTypes.signUpRequest),
      concatMap(({ email, password }) => {
        return from(this.supabaseApi.signUp(email, password)).pipe(
          map((data) => {
            return authActionTypes.signUpSuccess({
              userId: data.user?.id ?? '',
              email: data.user?.email ?? '',
            });
          }),
          catchError((error) => of(authActionTypes.signUpFailure({ error: error.message }))),
        );
      }),
    );
  });

  logInEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActionTypes.loginRequest),
      concatMap(({ email, password }) => {
        return from(this.supabaseApi.signIn(email, password)).pipe(
          map((data) => {
            return authActionTypes.loginSuccess({
              userId: data.user.id,
              email: data.user.email ?? '',
            });
          }),
          catchError((error) => of(authActionTypes.loginFailure({ error: error.message }))),
        );
      }),
    );
  });

  logOutEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActionTypes.logOutRequest),
      concatMap(() => {
        return from(this.supabaseApi.signOut()).pipe(
          map(() => authActionTypes.logOutSuccess()),
          catchError((error) => of(authActionTypes.loginFailure({ error: error.message }))),
        );
      }),
    );
  });

  checkSessionEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActionTypes.checkSession),
      concatMap(() => {
        return from(this.supabaseApi.getSession()).pipe(
          map((session) => {
            if (!session) return authActionTypes.loginFailure({ error: 'No Session' });
            return authActionTypes.loginSuccess({
              userId: session.user.id,
              email: session.user.email ?? '',
            });
          }),
          catchError((error) => of(authActionTypes.loginFailure({ error: error.message }))),
        );
      }),
    );
  });
}
