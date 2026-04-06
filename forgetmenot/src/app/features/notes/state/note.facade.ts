import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as noteActionTypes from './note.actions';
import { selectUserNotes } from './note.selector';

@Injectable({ providedIn: 'root' })
export class NoteCrudFacade {
  private readonly store = inject(Store);
  public notes$ = this.store.select(selectUserNotes);

  public createNote(note: string) {
    this.store.dispatch(noteActionTypes.createNoteRequest({ note }));
  }

  public deleteNote(id: number) {
    this.store.dispatch(noteActionTypes.deleteNoteRequest({ id }));
  }

  public getUserNotes() {
    this.store.dispatch(noteActionTypes.getNotesRequest());
  }
}
