import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as noteActionTypes from './note.actions';
import { concatMap, map, of, switchMap } from 'rxjs';
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

  getNotesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.getNotesRequest),
      switchMap(({ userId }) => {
        const userNotes = this.data.filter((notes) => notes.userId === userId);
        return of(noteActionTypes.getNotesSuccess({ notes: userNotes }));
      }),
    );
  });

  deleteNotesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.deleteNoteReqeust),
      concatMap(({ userId, note }) => {
        this.data = this.data.filter(
          (userData) => !(userData.userId === userId && userData.note === note),
        );
        return of(noteActionTypes.deleteNoteSuccess({ userId, note }));
      }),
    );
  });
}
