import { Component,OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {

  isLoading:boolean=false;
  constructor(private loaderService:LoaderService) {}

  ngOnInit(): void {
    //subscribe to observable from service to upate the loading state.
    this.loaderService.loader$.subscribe(
      (isLoading)=>{
        this.isLoading=isLoading;
        console.log(isLoading);
      }
    )
  }
}
