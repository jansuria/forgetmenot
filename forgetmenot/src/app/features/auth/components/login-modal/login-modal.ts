import { Component, Output, EventEmitter, inject, effect } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthFacade } from '../../state/auth.facade';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../state/auth.selectors';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule, Dialog, ButtonModule, InputTextModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  private readonly authFacade = inject(AuthFacade);
  private readonly store = inject(Store);

  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  isSignUp = false;
  visible = true;

  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);

  closeOnLogin = effect(() => {
    if (this.isLoggedIn()) {
      this.visible = false;
      this.close.emit();
    }
  });

  onLogin() {
    this.authFacade.userSignin({ email: this.email, password: this.password });
  }

  onSignUp() {
    this.authFacade.userSignUp({ email: this.email, password: this.password });
  }

  onClose() {
    this.visible = false;
    this.close.emit();
  }
  toggleMode() {
    this.isSignUp = !this.isSignUp;
  }
}
