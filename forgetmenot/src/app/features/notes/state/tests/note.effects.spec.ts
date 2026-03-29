import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideStore } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { NoteEffects } from '../note.effects';
import * as noteActionTypes from '../note.actions';
import { SupabaseApi } from '../../../../core/services/supabase';
import { MessageService } from 'primeng/api';

const mockSupabaseApi = {
  getUserNotes: (userId: string) => Promise.resolve([]),
  createNote: (userId: string, note: string) => Promise.resolve(null),
  deleteNote: (userId: string, note: string) => Promise.resolve(null),
};

describe('NoteEffects', () => {
  let effects: NoteEffects;
  let actions$ = new Observable<any>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        NoteEffects,
        provideStore(),
        provideMockActions(() => actions$),
        { provide: SupabaseApi, useValue: mockSupabaseApi },
      ],
    });
    effects = TestBed.inject(NoteEffects);
  });

  it('should dispatch getNotesSuccess after getNotesRequest', () => {
    actions$ = of(noteActionTypes.createNoteRequest({ userId: 'uoo1', note: 'Test Note' }));
    effects.createNoteEffect$.subscribe((action) => {
      expect(action).toEqual(noteActionTypes.getNotesSuccess({ notes: [] }));
    });
  });
});
