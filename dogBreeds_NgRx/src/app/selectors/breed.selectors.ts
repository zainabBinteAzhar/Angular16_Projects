import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreedState } from '../reducers/breed.reducers';

const selectBreedState = createFeatureSelector<BreedState>('breed');

export const selectImages = createSelector(
  selectBreedState,
  (state: BreedState) => state.images
);

export const selectHistory = createSelector(
  selectBreedState,
  (state: BreedState) => state.deletedImages
);
