import { createReducer, on } from '@ngrx/store';
import { NoteState } from '../../../shared/models/note.model';
import * as noteActionTypes from './note.actions';

export const initialState: NoteState = {
  notes: [],
  loading: false,
  gridViewable: false,
  error: null,
};

export const noteReducer = createReducer(
  initialState,
  on(noteActionTypes.createNoteRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(noteActionTypes.createNoteSuccess, (state, { note }) => ({
    ...state,
    loading: false,
    notes: [note, ...state.notes],
  })),
  on(noteActionTypes.createNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(noteActionTypes.getNotesRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(noteActionTypes.getNotesSuccess, (state, { notes }) => ({
    ...state,
    loading: false,
    gridViewable: true,
    notes,
  })),
  on(noteActionTypes.deleteNoteRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(noteActionTypes.deleteNoteSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    notes: state.notes.filter((n) => n.id !== id),
  })),
  on(noteActionTypes.disableGridRequest, (state) => ({
    ...state,
    gridViewable:false
  }))
);
