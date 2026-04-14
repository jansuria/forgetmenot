import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommandState } from '../../../shared/models/command.model';

export const selectCommandState = createFeatureSelector<CommandState>('commands');

export const selectCommandLoading = createSelector(selectCommandState, (state)=>state.loading);