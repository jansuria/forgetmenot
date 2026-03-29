import { TestBed } from '@angular/core/testing';
import { noteReducer } from '../note.reducer';
import { provideStore } from '@ngrx/store';
import { selectUserNotes } from '../note.selector';

describe('noteReducer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore({ notes: noteReducer })],
    }).compileComponents();
  });
  it('should select all notes', () => {
    const notes = [{ userId: 'u001', note: 'Test' }];
    const state = { notes: { notes, loading: false, error: null } };
    expect(selectUserNotes(state)).toEqual(notes);
  });
});
