import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as noteActionTypes from './note.actions';
import { selectUserNotes } from './note.selector';

@Injectable({ providedIn: 'root' })
export class NoteCrudFacade {
  private readonly store = inject(Store);
  public notes$ = this.store.select(selectUserNotes);

  public createNote(userId: string, note: string) {
    this.store.dispatch(noteActionTypes.createNoteRequest({ userId, note }));
  }

  public deleteNote(userId: string, note: string) {
    this.store.dispatch(noteActionTypes.deleteNoteReqeust({ userId, note }));
  }

  public getUserNotes(userId: string) {
    this.store.dispatch(noteActionTypes.getNotesRequest({ userId }));
  }
}
