import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as noteActionTypes from './note.actions';
import { catchError, concatMap, from, map, of, switchMap, tap } from 'rxjs';
import { SupabaseService } from '../../../core/services/supabase';
import { MessageService } from 'primeng/api';
import { NotesService } from '../../../core/services/notes.service';

@Injectable()
export class NoteEffects {
  private readonly actions$ = inject(Actions);
  private readonly notesApiService = inject(NotesService);
  private readonly toasterService = inject(MessageService);

  createNoteEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.createNoteRequest),
      concatMap(({ note }) => {
        return this.notesApiService.createNote(note).pipe(
          map((createdNote) => noteActionTypes.createNoteSuccess({ note: createdNote })),
          catchError((error) => of(noteActionTypes.createNoteFailure({ error }))),
        );
      }),
    );
  });

  createNoteNotificationEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(noteActionTypes.createNoteSuccess),
        tap(({ note }) => {
          this.toasterService.add({
            severity: 'success',
            summary: `Note Added`,
            detail: `Your note "${note.id}" was added succesfully`,
          });
        }),
      );
    },
    { dispatch: false },
  );

  getUserNotesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.getNotesRequest),
      concatMap(() => {
        return from(this.notesApiService.getNotes()).pipe(
          map((notes) => noteActionTypes.getNotesSuccess({ notes })),
        );
      }),
    );
  });

  deleteNotesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(noteActionTypes.deleteNoteRequest),
      concatMap(({ id }) => {
        return from(this.notesApiService.deleteNote(id)).pipe(
          switchMap(() => [noteActionTypes.deleteNoteSuccess({ id })]),
        );
      }),
    );
  });

  deleteNoteNotificaitonEffec = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(noteActionTypes.deleteNoteSuccess),
        tap(({ id }) => {
          this.toasterService.add({
            severity: 'success',
            summary: `Note Deleted`,
            detail: `Your note "${id}" was deleted succesfully`,
          });
        }),
      );
    },
    { dispatch: false },
  );
}
