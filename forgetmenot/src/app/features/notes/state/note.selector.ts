import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from '../../../shared/models/note.model';

export const selectNoteState = createFeatureSelector<NoteState>('notes');

export const selectUserNotes = createSelector(selectNoteState, (state) => state.notes);

export const selectIsGridViewable = createSelector(selectNoteState, (state) => state.gridViewable)
