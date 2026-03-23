import { createReducer, on } from '@ngrx/store';
import { DUMMY_NOTES } from '../../data/user-data';
import { NoteState } from '../models/note.model';
import * as noteActionTypes from './note.actions';

export const initialState: NoteState = {
  notes: DUMMY_NOTES,
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
    notes: [...state.notes, { userId, note }],
  })),
);
