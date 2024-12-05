import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10'; // Example endpoint
  private imagesSubject = new BehaviorSubject<any[]>([]);
  private deletedImagesSubject = new BehaviorSubject<any[]>([]);
  private deletedImages: any[] = [];

  constructor(private http: HttpClient) {
    this.loadImages();
  }

  private loadImages(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((images) => {
      this.imagesSubject.next(images);
    });
  }

  getImages(): Observable<any[]> {
    return this.imagesSubject;
  }

  getDeletedImages(): Observable<any[]> {
    return this.deletedImagesSubject;
  }

  deleteImage(image: any): void {
    const currentImages = this.imagesSubject.getValue();
    const updatedImages = currentImages.filter((img) => img.id !== image.id);
    this.deletedImages.push(image);
    this.deletedImagesSubject.next(this.deletedImages); // Update deleted images
    this.imagesSubject.next(updatedImages);
  }

  restoreImage(): void {
    if (this.deletedImages.length > 0) {
      const imageToRestore = this.deletedImages.shift(); // Get the first deleted image
      const currentImages = this.imagesSubject.getValue();
      this.imagesSubject.next([imageToRestore, ...currentImages]);
      this.deletedImagesSubject.next(this.deletedImages); // Update deleted images
    }
  }
}
