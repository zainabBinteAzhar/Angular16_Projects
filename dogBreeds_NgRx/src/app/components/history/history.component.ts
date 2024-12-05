import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  deletedImages: any[] = [];
  isButtonDisabled = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getDeletedImages().subscribe((deletedImages) => {
      this.deletedImages = deletedImages;
    });
  }

  restoreImage(): void {
    this.isButtonDisabled = true;
    this.data.restoreImage();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 1000);
  }
}
