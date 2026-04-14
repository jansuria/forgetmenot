import { createAction, props } from '@ngrx/store';
import { Note } from '../../../shared/models/note.model';

export const getNotesRequest = createAction('[Note] Get User Notes Request');

export const getNotesSuccess = createAction(
  '[Note] Retrieved Successully',
  props<{ notes: Note[] }>(),
);

export const createNoteRequest = createAction('[Note] Create Request', props<{ note: string }>());

export const createNoteSuccess = createAction(
  '[Note] Created Succesfully',
  props<{ note: Note }>(),
);

export const createNoteFailure = createAction('[Note] Create Failure', props<{ error: unknown }>());

export const deleteNoteRequest = createAction('[Note] Delete Request', props<{ id: number }>());

export const deleteNoteSuccess = createAction(
  '[Note] Delete Request Success',
  props<{ id: number }>(),
);

export const disableGridRequest = createAction('[TEST]');
