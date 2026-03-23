import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteCrudFacade } from '../state/note.facade';
@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
  standalone: true,
})
export class UserInput implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  public userText: string = '';
  public userId: string = '1';
  elementRef = inject(ElementRef);
  noteFacade = inject(NoteCrudFacade);

  ngOnInit(): void {
    this.elementRef.nativeElement.style.setProperty('--x', `${this.x}px`);
    this.elementRef.nativeElement.style.setProperty('--y', `${this.y}px`);
  }

  onSave() {
    console.log(this.userText);
    this.noteFacade.createNote(this.userId, this.userText);
    this.userText = '';
  }
}
