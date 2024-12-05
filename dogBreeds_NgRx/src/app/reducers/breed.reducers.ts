import { createReducer, on } from '@ngrx/store';
import * as BreedActions from '../actions/breed.actions';

export interface BreedState {
  images: any[];
  deletedImages: any[];
}

export const initialState: BreedState = {
  images: [],
  deletedImages: [],
};

export const breedReducer = createReducer(
  initialState,
  on(BreedActions.loadImagesSuccess, (state, { images }) => ({
    ...state,
    images,  // Update images on success
  })),
  on(BreedActions.loadImagesFailure, (state, { error }) => ({
    ...state,
    images: [],  // In case of failure, set images to empty
  })),
  on(BreedActions.deleteImage, (state, { image }) => ({
    ...state,
    images: state.images.filter((img) => img.id !== image.id), // Remove image from images
    deletedImages: [...state.deletedImages, image],  // Add to deletedImages
  })),
  on(BreedActions.restoreImage, (state) => {
    const restoredImage = state.deletedImages[0];  // Get the first deleted image
    return {
      ...state,
      images: [restoredImage, ...state.images],  // Add it back to the top
      deletedImages: state.deletedImages.slice(1),  // Remove it from deletedImages
    };
  })
);
