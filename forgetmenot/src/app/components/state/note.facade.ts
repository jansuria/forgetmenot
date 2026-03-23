import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as noteActionTypes from './note.actions';

@Injectable({ providedIn: 'root' })
export class NoteCrudFacade {
  private readonly store = inject(Store);

  public createNote(userId: string, note: string) {
    this.store.dispatch(noteActionTypes.createNoteRequest({ userId, note }));
  }

  public deleteNote(userId: string, note: string) {
    this.store.dispatch(noteActionTypes.deleteNoteReqeust({ userId, note }));
  }
}
