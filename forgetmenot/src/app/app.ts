import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInput } from './features/notes/components/user-input/user-input';
import { Toast } from 'primeng/toast';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './features/auth/state/auth.selectors';
import { LoginModal } from './features/auth/components/login-modal/login-modal';

@Component({
  selector: 'app-root',
  imports: [UserInput, Toast, RouterOutlet, LoginModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly store = inject(Store);
  protected readonly title = signal('forgetmenot');

  showLoginModal = false;
  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);

  showInput: boolean = false;
  inputY: number = 0;
  inputX: number = 0;

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
}
