import { createAction, props } from '@ngrx/store';

// Action to load images
export const loadImages = createAction('[Breed] Load Images');

// Action when images are loaded successfully
export const loadImagesSuccess = createAction(
  '[Breed] Load Images Success',
  props<{ images: any[] }>()
);

// Action when loading images fails
export const loadImagesFailure = createAction(
  '[Breed] Load Images Failure',
  props<{ error: any }>()
);

// Action to delete an image
export const deleteImage = createAction(
  '[Breed] Delete Image',
  props<{ image: any }>()
);

// Action to restore an image
export const restoreImage = createAction('[Breed] Restore Image');
