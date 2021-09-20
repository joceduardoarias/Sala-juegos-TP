import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = environment.apiURL;
  images:Observable<any> = new Observable();
  constructor(private http:HttpClient) {
    this.images = this.getImages();
   }

  obtenerImagenes(){
    return this.http.get(this.url);
  }

  getImages(): Observable<any>{
    return this.http.get(this.url);
  }
}
