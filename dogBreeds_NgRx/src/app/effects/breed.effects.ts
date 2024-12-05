import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as BreedActions from '../actions/breed.actions';
import { createEffect } from '@ngrx/effects';  // <-- Import createEffect

@Injectable()
export class BreedEffects {
  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreedActions.loadImages), // Listen for the loadImages action
      switchMap(() =>
        this.http.get<any[]>(this.apiUrl).pipe(
          map((images) => BreedActions.loadImagesSuccess({ images })), // On success, dispatch loadImagesSuccess
          catchError((error) => of(BreedActions.loadImagesFailure({ error }))) // On error, dispatch loadImagesFailure
        )
      )
    )
  );
}
