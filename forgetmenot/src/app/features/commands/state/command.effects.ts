import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as commandActionTypes from './command.actions';
import { catchError, concatMap, map, of } from 'rxjs';
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
          map((result) => commandActionTypes.dispatchCommandSuccess({ result })),
          catchError((error) => of(commandActionTypes.dispatchCommandFailure({ error }))),
        );
      }),
    );
  });
}
