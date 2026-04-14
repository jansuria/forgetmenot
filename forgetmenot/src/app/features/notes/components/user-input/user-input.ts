import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteCrudFacade } from '../../state/note.facade';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../../../shared/models/note.model';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../auth/state/auth.selectors';
import { CommandFacade } from '../../../commands/state/command.facade';
import { selectIsGridViewable } from '../../state/note.selector';

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
  private commandFacade = inject(CommandFacade);
  notes$ = this.noteFacade.notes$;
  elementRef = inject(ElementRef);
  showNotes = false;
  gridViewable = this.store.selectSignal(selectIsGridViewable)

  ngOnInit(): void {
    this.elementRef.nativeElement.style.setProperty('--x', `${this.x}px`);
    this.elementRef.nativeElement.style.setProperty('--y', `${this.y}px`);
    console.log(this.gridViewable());
  }

  onNoteSave() {
    if (!this.userText.trim()) return;
    this.commandFacade.commandDispatch(this.userText);
    this.userText = '';
  }

  deleteUserNote(userNote: Note) {
    this.noteFacade.deleteNote(userNote.id);
  }

  dontShowGrid(){
    this.noteFacade.disableGrid();
    console.log(this.gridViewable())
  }
}
