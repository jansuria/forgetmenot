import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from '../models/note.model';

export const selectNoteState = createFeatureSelector<NoteState>('notes');

export const selectUserNotes = createSelector(selectNoteState, (state) => state.notes);
