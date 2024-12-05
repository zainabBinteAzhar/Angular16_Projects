import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { selectHistory } from '../../selectors/breed.selectors';  // Import the selector

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  deletedImages$!: Observable<any[]>;  // Declare the observable for deleted images
  isButtonDisabled: boolean = false;  // Flag to disable restore button

  constructor(private store: Store, private breedService: DataService) {}

  ngOnInit(): void {
    // Select deleted images from the store using the selector
    this.deletedImages$ = this.store.select(selectHistory);

    // Subscribe to deleted images to manage the restore button state
    this.deletedImages$.subscribe((deletedImages) => {
      this.isButtonDisabled = deletedImages.length === 0;
    });
  }

  restoreImage(): void {
    this.breedService.restoreImage();
  }
}
