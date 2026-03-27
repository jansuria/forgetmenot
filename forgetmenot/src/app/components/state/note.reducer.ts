import { createReducer, on } from '@ngrx/store';
import { DUMMY_NOTES } from '../../data/user-data';
import { NoteState } from '../../shared/models/note.model';
import * as noteActionTypes from './note.actions';

export const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

export const noteReducer = createReducer(
  initialState,
  on(noteActionTypes.createNoteRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(noteActionTypes.createNoteSuccess, (state, { userId, note }) => ({
    ...state,
    loading: false,
  })),
  on(noteActionTypes.getNotesRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(noteActionTypes.getNotesSuccess, (state, { notes }) => ({
    ...state,
    loading: false,
    notes,
  })),
  on(noteActionTypes.deleteNoteRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(noteActionTypes.deleteNoteSuccess, (state, { userId, note }) => ({
    ...state,
    loading: false,
    notes: state.notes.filter((notes) => !(notes.userId == userId && notes.note === note)),
  })),
);
