import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideStore } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { NoteEffects } from '../note.effects';
import * as noteActionTypes from '../note.actions';
import { DUMMY_NOTES } from '/Users/jansuria/Documents/Code/Angular/forgetMeNot/forgetmenot/forgetmenot/src/app/data/user-data';

describe('NoteEffects', () => {
  let effects: NoteEffects;
  let actions$ = new Observable();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteEffects, provideStore(), provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(NoteEffects);
  });
  it('should return filtered notes for a userId', () => {
    actions$ = of(noteActionTypes.getNotesRequest({ userId: 'u001' }));

    effects.getNotesEffect$.subscribe((action) => {
      expect(action).toEqual(
        noteActionTypes.getNotesSuccess({
          notes: DUMMY_NOTES.filter((notes) => notes.userId === 'u001'),
        }),
      );
    });
  });
  it('should add note and dispatch createNoteSuccess', () => {
    actions$ = of(
      noteActionTypes.createNoteRequest({
        userId: 'u001',
        note: 'Test note',
      }),
    );

    effects.createNoteEffect$.subscribe((action) => {
      expect(action).toEqual(
        noteActionTypes.createNoteSuccess({
          userId: 'u001',
          note: 'Test note',
        }),
      );
    });
  });
  it('should remove note and dispatch deleteNoteSuccess', () => {
    actions$ = of(
      noteActionTypes.deleteNoteRequest({
        userId: 'u001',
        note: 'Test note',
      }),
    );

    effects.deleteNotesEffect$.subscribe((action) => {
      expect(action).toEqual(
        noteActionTypes.deleteNoteSuccess({
          userId: 'u001',
          note: 'Test note',
        }),
      );
    });
  });
});
