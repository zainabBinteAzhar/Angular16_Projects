import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectImages } from '../../selectors/breed.selectors';  // Correct import of selector
import * as BreedActions from '../../actions/breed.actions';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
})
export class BreedComponent implements OnInit {
  images$!: Observable<any[]>;  

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.images$ = this.store.select(selectImages);  // Select images from the store
  }

  deleteImage(image: any): void {
    debugger
    this.store.dispatch(BreedActions.deleteImage({ image }));  // Dispatch delete action
  }
}
