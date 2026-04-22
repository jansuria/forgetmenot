import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoteCrudFacade } from '../notes/state/note.facade';
import { TableModule } from 'primeng/table';
import { selectIsGridViewable } from '../notes/state/note.selector';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../shared/models/note.model';

@Component({
  selector: 'app-grid',
  imports: [TableModule, AsyncPipe],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
  private readonly store = inject(Store);
  private readonly noteFacade = inject(NoteCrudFacade);
  gridViewable = this.store.selectSignal(selectIsGridViewable);

  notes$ = this.noteFacade.notes$;
}
