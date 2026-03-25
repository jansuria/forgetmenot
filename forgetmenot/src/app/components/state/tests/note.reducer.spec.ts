import { TestBed } from '@angular/core/testing';
import { createNoteRequest, createNoteSuccess, deleteNoteSuccess } from '../note.actions';
import { initialState, noteReducer } from '../note.reducer';
import { provideStore } from '@ngrx/store';

describe('noteReducer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore({ notes: noteReducer })],
    }).compileComponents();
  });

  it('should add a note on createNoteSuccess', () => {
    const note = { userId: 'u001', note: 'Test note' };
    const action = createNoteSuccess({ userId: note.userId, note: note.note });
    const state = noteReducer(initialState, action);
    expect(state.notes).toContainEqual(note);
  });

  it('should remove a note on deleteNoteSuccess', () => {
    const note = { userId: 'u001', note: 'Test note' };
    const stateWithNote = { ...initialState, notes: [note] };
    const action = deleteNoteSuccess({ userId: note.userId, note: note.note });
    const state = noteReducer(stateWithNote, action);
    expect(state.notes).not.toContain(note);
  });

  it('should set loading true on request', () => {
    const action = createNoteRequest({ userId: 'u001', note: 'Test' });
    const state = noteReducer(initialState, action);
    expect(state.loading).toBe(true);
  });
});
