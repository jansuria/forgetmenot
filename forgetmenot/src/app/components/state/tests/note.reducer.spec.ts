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

  it('should set loading false on createNoteSuccess', () => {
    const note = { userId: 'u001', note: 'Test note' };
    const action = createNoteSuccess({ userId: note.userId, note: note.note });
    const state = noteReducer(initialState, action);
    expect(state.loading).toBe(false);
  });
});
