import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  deletedImages = this.data.getDeletedImages();  // Signal for deleted images
  isButtonDisabled = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    // Initially fetch a dog image
    this.data.fetchDogImages();
  }

  // Fetch a new dog image
  fetchDogImage(): void {
    this.data.getDeletedImages();
  }
  // Restore the first deleted image
  restoreFirstDeletedImage(): void {
    this.isButtonDisabled = true;
    this.data.restoreFirstDeletedImage();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
  }

}
