import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10'; 
  //Signal holds array of dogs image URLs
  private dogImages = signal<string[]>([]);
  //Signal holds array of deleted image URLs
  private deletedImages = signal<string[]>([]);


  //Inject HttpClient: service can make http req
  constructor(private http: HttpClient) {}

  fetchDogImages(): void {
    //get Req to get data from private url.
    //expects array of objects.
    this.http.get<any[]>(this.apiUrl).subscribe({
      //next: handle successful req and emites new value.
      //complete:  it has emitted all values and there will be no more values.
      //error: any error occured during fetching data.

      //data is the actual data return by htt req.
      next: (data) => {
        const imageUrls = data.map(item => item.url); //extract urls from the response
        console.log('Fetched Dog Image URLs:', imageUrls);
        //update dogImages signal with array of image urls
        this.dogImages.set(imageUrls);
      },
      error: (err) => {
        console.error('Error fetching dog images', err);
      },
    });
  }

  //used RestOperators: to get rest of values of an array.
  //!: tell typescript(am sure) value is not null or undefined.

  deleteLastImage(): void {
    const images = this.dogImages();
    if (images.length > 0) {
      //pop: removes last img from array.
      const lastImage = images.pop()!;

      //this.deletedImages():getter to access the current value of the Signal.
      //this.dogImages.set(newValue): set new value. [it will trigger updates in components that are subscribed to it].

      this.deletedImages.set([ ...this.deletedImages(),lastImage]);
      this.dogImages.set(images);
    }
  }
  restoreFirstDeletedImage(): void {
    const deletedImages = this.deletedImages();
    if (deletedImages.length > 0) {
      //shift: removes first img from array.
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
