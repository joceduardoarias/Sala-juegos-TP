import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = environment.apiURL;
  constructor(private http:HttpClient) { }

  obtenerImagenes(){
    return this.http.get(this.url);
  }
}
