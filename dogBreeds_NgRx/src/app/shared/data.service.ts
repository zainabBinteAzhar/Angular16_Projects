import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BreedActions from '../actions/breed.actions';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10';

  constructor(private http: HttpClient, private store: Store) {
    this.loadImages();
  }

  // Fetch images from API and dispatch to store
  private loadImages(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((images) => {
      this.store.dispatch(BreedActions.loadImagesSuccess({ images }));
    });
  }

  // Dispatch action to delete image
  deleteImage(image: any): void {
    this.store.dispatch(BreedActions.deleteImage({ image }));
  }

  // Dispatch action to restore image
  restoreImage(): void {
    this.store.dispatch(BreedActions.restoreImage());
  }
}
