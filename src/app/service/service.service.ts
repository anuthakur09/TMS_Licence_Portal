import { Injectable } from '@angular/core';
import { Environment } from "../environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  apiUrl = `${Environment.appBaseURL}api/Users`;
  
  constructor(private http: HttpClient) {

  }

  createData(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getAllEntries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllUser`);
  }

  updateEntry(data: any) {
    return this.http.put(this.apiUrl, data);
  }

  deleteEntry(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getUserbyId(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

}