// src/app/breed/breed.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
})
export class BreedComponent implements OnInit {
  dogImages = this.dogImageService.getDogImages();
  isButtonDisabled = false;

  constructor(private dogImageService: DataService) {}

  ngOnInit(): void {
    // Initially fetch a dog image
    this.dogImageService.fetchDogImages();
  }

  // Fetch a new dog image
  fetchDogImage(): void {
    this.dogImageService.getDogImages();
  }

  // Delete the last dog image
  deleteLastImage(): void {
    this.isButtonDisabled = true;
    this.dogImageService.deleteLastImage();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
  }
}
