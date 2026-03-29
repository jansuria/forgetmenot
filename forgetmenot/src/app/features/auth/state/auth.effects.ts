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
            if (!data.user.email) throw new Error('No email found');
            return authActionTypes.loginSuccess({
              userId: data.user.id,
              email: data.user.email,
            });
          }),
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
}
