import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10'; 
  private dogImages = signal<string[]>([]);
  private deletedImages = signal<string[]>([]);

  constructor(private http: HttpClient) {}

  fetchDogImages(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        const imageUrls = data.map(item => item.url); // Extract URLs from the response
        console.log('Fetched Dog Image URLs:', imageUrls);
        this.dogImages.set(imageUrls);
      },
      error: (err) => {
        console.error('Error fetching dog images', err);
      },
    });
  }

  //used RestOperators: to get rest of values of an array

  addDogImage(imageUrl: string): void {
    console.log('Adding Image:', imageUrl);
    this.dogImages.set([...this.dogImages(), imageUrl]);
  }

  deleteLastImage(): void {
    const images = this.dogImages();
    if (images.length > 0) {
      const lastImage = images.pop()!;
      this.deletedImages.set([ ...this.deletedImages(),lastImage]);
      this.dogImages.set(images);
    }
  }
  restoreFirstDeletedImage(): void {
    const deletedImages = this.deletedImages();
    if (deletedImages.length > 0) {
      const firstDeletedImage = deletedImages.shift()!;
      this.dogImages.set([firstDeletedImage, ...this.dogImages()]);
      this.deletedImages.set(deletedImages);
    }
  }

  getDogImages() {
    return this.dogImages;
  }

  getDeletedImages() {
    return this.deletedImages;
  }
}
