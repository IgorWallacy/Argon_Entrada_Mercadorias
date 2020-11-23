import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  api:string = environment.apiUrl

  getFilial(){

   
    return this.http.get(`${this.api}/api/filial`)
  }

}
