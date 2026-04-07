import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as commandActionTypes from './command.actions';

@Injectable({ providedIn: 'root' })
export class CommandFacade {
  private readonly store = inject(Store);

  public commandDispatch(userInput: string) {
    this.store.dispatch(commandActionTypes.dispatchCommandRequest({ userInput }));
  }
}
