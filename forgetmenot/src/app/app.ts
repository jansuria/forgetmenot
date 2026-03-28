import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInput } from './components/user-input/user-input';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [UserInput, Toast, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('forgetmenot');

  showInput: boolean = false;
  inputY: number = 0;
  inputX: number = 0;

  onClick(event: PointerEvent) {
    this.showInput = true;
    this.inputX = event.pageX;
    this.inputY = event.pageY;
  }
}
