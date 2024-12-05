import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
})
export class BreedComponent implements OnInit {
  images: any[] = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getImages().subscribe((images) => {
      this.images = images;
    });
  }
  deleteImage(image: any): void {
    this.data.deleteImage(image);
  }
}
