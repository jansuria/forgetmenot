import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteCrudFacade } from '../../state/note.facade';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../../../shared/models/note.model';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../auth/state/auth.selectors';

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
  private readonly store = inject(Store);
  public userText: string = '';
  private noteFacade = inject(NoteCrudFacade);
  notes$ = this.noteFacade.notes$;
  elementRef = inject(ElementRef);
  userId = this.store.selectSignal(selectUserId);

  ngOnInit(): void {
    this.elementRef.nativeElement.style.setProperty('--x', `${this.x}px`);
    this.elementRef.nativeElement.style.setProperty('--y', `${this.y}px`);
  }

  onNoteSave() {
    const userId = this.userId();
    if (!userId) return;
    this.noteFacade.createNote(userId, this.userText);
    this.userText = '';
  }

  deleteUserNote(userNote: Note) {
    this.noteFacade.deleteNote(userNote.userId, userNote.note);
  }

  getUserNotes() {
    const userId = this.userId();
    if (!userId) return;
    this.noteFacade.getUserNotes(userId);
  }
}
