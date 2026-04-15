import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInput } from './features/notes/components/user-input/user-input';
import { Toast } from 'primeng/toast';
import { AuthFacade } from '../app/features/auth/state/auth.facade';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './features/auth/state/auth.selectors';
import { LoginModal } from './features/auth/components/login-modal/login-modal';
import * as authActionTypes from '../app/features/auth/state/auth.actions';
import { selectCommandLoading } from './features/commands/state/command.selectors';
import { ProgressSpinnerModule, ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [UserInput, Toast, RouterOutlet, LoginModal, ProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly store = inject(Store);
  private readonly authFacade = inject(AuthFacade);
  protected readonly title = signal('forgetmenot');

  ngOnInit(): void {
    this.store.dispatch(authActionTypes.checkSession());
  }

  showLoginModal = false;
  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  isLoading = this.store.selectSignal(selectCommandLoading);

  showInput: boolean = false;
  inputY: number = 0;
  inputX: number = 0;

  resetOnLogout = effect(() => {
    if (!this.isLoggedIn()) {
      this.showInput = false;
    }
  });

  onClick(event: PointerEvent) {
    if (!this.isLoggedIn()) {
      this.showLoginModal = true;
    } else {
      this.showInput = true;
      this.inputX = event.pageX;
      this.inputY = event.pageY;
    }
  }

  onModalClose() {
    this.showLoginModal = false;
  }

  onLogOut() {
    this.authFacade.userLogOut();
  }
}
