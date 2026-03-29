import { TestBed } from '@angular/core/testing';
import { noteReducer } from '../note.reducer';
import { provideStore, Store } from '@ngrx/store';
import { NoteCrudFacade } from '../note.facade';
import { createNoteRequest } from '../note.actions';

describe('NoteCrudFacade', () => {
  let facade: NoteCrudFacade;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore({ notes: noteReducer }), NoteCrudFacade],
    }).compileComponents();

    facade = TestBed.inject(NoteCrudFacade);
    store = TestBed.inject(Store);
  });

  it('should dispatch createNoteRequest', () => {
    jest.spyOn(store, 'dispatch');
    facade.createNote('u001', 'Test note');
    expect(store.dispatch).toHaveBeenCalledWith(
      createNoteRequest({ userId: 'u001', note: 'Test note' }),
    );
  });
});
