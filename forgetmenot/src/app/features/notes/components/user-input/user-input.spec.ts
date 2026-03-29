import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { noteReducer } from '../../state/note.reducer';

import { UserInput } from './user-input';

describe('UserInput', () => {
  let component: UserInput;
  let fixture: ComponentFixture<UserInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInput],
      providers: [provideStore({ notes: noteReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
