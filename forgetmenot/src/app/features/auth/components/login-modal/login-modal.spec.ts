import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authReducer } from '../../../auth/state/auth.reducers';
import { LoginModal } from './login-modal';
import { provideStore } from '@ngrx/store';

describe('LoginModal', () => {
  let component: LoginModal;
  let fixture: ComponentFixture<LoginModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModal],
      providers: [
        provideStore({
          auth: authReducer,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
