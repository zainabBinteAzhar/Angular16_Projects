import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
})
export class BreedComponent implements OnInit {
  breedImages: string[] = [];
  isButtonDisabled = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.loadBreedImages();
  }

  loadBreedImages(): void {
    this.isButtonDisabled = true;

    this.data.getImageByBreed().subscribe(
      (response) => {
        this.breedImages = response.map((img: any) => img.url);
      },
      (error) => {
        console.log('ERROR FETCHING IMAGES: ', error.message);
      }
    );
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 3000);
  }
}
