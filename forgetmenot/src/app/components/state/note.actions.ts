import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note.model';

export const getNotesRequest = createAction('[Note] Get user notes', props<{ userId: string }>());

export const getNotesSuccess = createAction(
  '[Note] Retrieved Successully',
  props<{ notes: Note[] }>(),
);

export const createNoteRequest = createAction(
  '[Note] Create Request',
  props<{ userId: string; note: string }>(),
);

export const createNoteSuccess = createAction(
  '[Note] Created Succesfully',
  props<{ userId: string; note: string }>(),
);

export const deleteNoteReqeust = createAction(
  '[Note] Delete Request',
  props<{ userId: string; note: string }>(),
);

export const deleteNoteSuccess = createAction(
  '[Note] Delete Request Success',
  props<{ userId: string; note: string }>(),
);
