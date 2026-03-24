import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteCrudFacade } from '../state/note.facade';
import { AsyncPipe } from '@angular/common';
import { Note } from '../models/note.model';
@Component({
  selector: 'app-user-input',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
  standalone: true,
})
export class UserInput implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  public userText: string = '';
  public userId: string = 'u001';
  private noteFacade = inject(NoteCrudFacade);
  notes$ = this.noteFacade.notes$;
  elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.style.setProperty('--x', `${this.x}px`);
    this.elementRef.nativeElement.style.setProperty('--y', `${this.y}px`);
  }

  onNoteSave() {
    this.noteFacade.createNote(this.userId, this.userText);
    this.userText = '';
  }

  deleteUserNote(userNote: Note) {
    console.log(userNote.userId);
    this.noteFacade.deleteNote(userNote.userId, userNote.note);
  }

  getUserNotes() {
    this.noteFacade.getUserNotes(this.userId);
  }
}
