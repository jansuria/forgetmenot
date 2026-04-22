import { Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteCrudFacade } from '../../state/note.facade';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../../../shared/models/note.model';
import { Store } from '@ngrx/store';
import { CommandFacade } from '../../../commands/state/command.facade';
import { selectIsGridViewable } from '../../state/note.selector';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
  standalone: true,
  host: {
    '[style.left.px]': 'x()',
    '[style.top.px]': 'y()',
    '(click)': '$event.stopPropagation()',
  },
})
export class UserInput {
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  private readonly refocusOnMove = effect(() => {
    this.x();
    this.y();
    this.inputEl()?.nativeElement.focus();
  });

  private readonly store = inject(Store);
  private readonly noteFacade = inject(NoteCrudFacade);
  private readonly commandFacade = inject(CommandFacade);

  userText = '';
  notes$ = this.noteFacade.notes$;
  gridViewable = this.store.selectSignal(selectIsGridViewable);

  onNoteSave() {
    if (!this.userText.trim()) return;
    this.commandFacade.commandDispatch(this.userText);
    this.userText = '';
  }

  deleteUserNote(userNote: Note) {
    this.noteFacade.deleteNote(userNote.id);
  }

  dontShowGrid() {
    this.noteFacade.disableGrid();
  }
}
