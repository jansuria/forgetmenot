import { createAction, props } from '@ngrx/store';

export const dispatchCommandRequest = createAction(
  '[Command] Dispatch Request',
  props<{ userInput: string }>(),
);

export const dispatchCommandSuccess = createAction(
  '[Command] Dispatch Successful',
  props<{ result: unknown }>(),
);

export const dispatchCommandFailure = createAction(
  '[Command] Dipatch Failed',
  props<{ error: unknown }>(),
);
