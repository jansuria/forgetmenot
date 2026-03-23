import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as noteActionTypes from './note.actions';
import { concatMap, of } from 'rxjs';
import { DUMMY_NOTES } from '../../data/user-data';

@Injectable()
export class NoteEffects {
  private readonly actions$ = inject(Actions);
  private data = [...DUMMY_NOTES];

  createNoteEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.createNoteRequest),
      concatMap(({ userId, note }) => {
        this.data.push({ userId, note });
        return of(noteActionTypes.createNoteSuccess({ userId, note }));
      }),
    );
  });
}
