import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as commandActionTypes from './command.actions';
import * as noteActionTypes from '../../notes/state/note.actions';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { CommandsService } from '../../../core/services/commands.service';

@Injectable()
export class CommandEffects {
  private readonly actions$ = inject(Actions);
  private readonly commandsApiService = inject(CommandsService);

  dispatchCommandEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(commandActionTypes.dispatchCommandRequest),
      concatMap(({ userInput }) => {
        return this.commandsApiService.dispatchCommand(userInput).pipe(
          map((result: any) => {
            if (result.function === 'createNote') {
              return noteActionTypes.createNoteSuccess({ note: result.note });
            }
            if (result.function === 'getNotes') {
              return noteActionTypes.getNotesSuccess({ notes: result.notes });
            }
            return commandActionTypes.dispatchCommandSuccess({ result });
          }),
          catchError((error) => of(commandActionTypes.dispatchCommandFailure({ error }))),
        );
      }),
    );
  });
}
