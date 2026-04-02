import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActionTypes from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  public userSignin({ email, password }: { email: string; password: string }) {
    this.store.dispatch(authActionTypes.loginRequest({ email, password }));
  }

  public userSignUp({ email, password }: { email: string; password: string }) {
    this.store.dispatch(authActionTypes.signUpRequest({ email, password }));
  }

  public userLogOut() {
    this.store.dispatch(authActionTypes.logOutRequest());
  }
}
