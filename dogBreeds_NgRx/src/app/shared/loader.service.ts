import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // loadingState: A BehaviorSubject that holds the actual loading state and allows modification.
  // loading$: An Observable that exposes only the ability to subscribe to changes in the loading state, but not modify it directly.

  private loaderState = new BehaviorSubject<boolean>(false); //dataType: boolean, initially: false
  public loader$ = this.loaderState.asObservable();
  
  //Set loading state to true or false
  setLoading(isLoading:boolean):void{
    this.loaderState.next(isLoading);
  }
}
