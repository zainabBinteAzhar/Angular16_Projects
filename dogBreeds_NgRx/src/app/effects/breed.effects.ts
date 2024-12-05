import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as BreedActions from '../actions/breed.actions';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class BreedEffects {
  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      //ofType:listens for specific action.
      ofType(BreedActions.loadImages), //listen for the loadImages action

      //switchMap listens for the loadImages action, then switches to a new observable:
      //it ensures that only the most recent HTTP request will be processed, canceling any previous requests that were still ongoing.
      // If the user dispatches the loadImages action multiple times, only the latest request will be handled
      switchMap(() =>
        this.http.get<any[]>(this.apiUrl).pipe(
          map((images) => BreedActions.loadImagesSuccess({ images })), //when img get loaded:success
          catchError((error) => of(BreedActions.loadImagesFailure({ error }))) //error
        )
      )
    )
  );
}
