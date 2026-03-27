import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as noteActionTypes from './note.actions';
import { catchError, concatMap, from, map, of, switchMap } from 'rxjs';
import { DUMMY_NOTES } from '../../data/user-data';
import { SupabaseService } from '../../core/services/supabase';

@Injectable()
export class NoteEffects {
  private readonly actions$ = inject(Actions);
  private readonly supabaseApi = inject(SupabaseService);
  private data = [...DUMMY_NOTES];

  createNoteEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.createNoteRequest),
      concatMap(({ userId, note }) => {
        return from(this.supabaseApi.createNote(userId, note)).pipe(
          map(() => noteActionTypes.createNoteSuccess({ userId, note })),
          // catchError((error)=> of(note))
        );
      }),
    );
  });

  getUserNotesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.getNotesRequest),
      concatMap(({ userId }) => {
        return from(this.supabaseApi.getUserNotes(userId)).pipe(
          map((notes) => noteActionTypes.getNotesSuccess({ notes })),
        );
      }),
    );
  });

  deleteNotesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.deleteNoteRequest),
      concatMap(({ userId, note }) => {
        return from(this.supabaseApi.deleteUserNote(userId, note)).pipe(
          switchMap(() => [
            noteActionTypes.deleteNoteSuccess({ userId, note }),
            noteActionTypes.getNotesRequest({ userId }),
          ]),
        );
      }),
    );
  });
}
