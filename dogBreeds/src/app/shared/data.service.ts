import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://api.thedogapi.com/v1/images/search?limit=10'; // Example endpoint

  constructor(private http:HttpClient) { }

  getImageByBreed():Observable<any>{
    const url=`${this.apiUrl}`;
    return this.http.get<any>(url);
  }
}
