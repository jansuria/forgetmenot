import { createReducer, on } from '@ngrx/store';
import * as commandActionTypes from './command.actions';
import { CommandState } from '../../../shared/models/command.model';

export const initialState: CommandState = {
  loading: false,
  result: null,
  error: null,
};

export const commandReducer = createReducer(
  initialState,
  on(commandActionTypes.dispatchCommandRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(commandActionTypes.dispatchCommandSuccess, (state, { result }) => ({
    ...state,
    loading: false,
    result,
  })),
  on(commandActionTypes.dispatchCommandFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
