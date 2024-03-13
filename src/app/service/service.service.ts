import { Injectable } from '@angular/core';
import { Environment } from "../environment";
import { HttpClient } from "@angular/common/http";
import { IUser } from '../models/userModel';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  apiUrl = `${Environment.appBaseURL}api/Users`;
  rawData: any = [
    { id: 1, name: "Hero1", role: "Super Strength" },
    { id: 2, name: "Hero2", role: "Telekinesis" },
  ];

  constructor(private http: HttpClient) {

  }

  createData(data: IUser) {
    debugger;
    return this.http.post(this.apiUrl, data);
    // this.rawData.push(data);
  }

  getAllEntries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateEntry(id: number) {
    return this.http.put(this.apiUrl, id);
  }

  deleteEntry(id: number) {
    // this.http.delete(this.apiUrl);
    this.rawData.splice(id, 1);
  }

  sample(id: number, data: any) {
    this.rawData.forEach((element: { id: number, name: any; role: any; }) => {
      if (id == element.id) {
        element.name = data.name;
        element.role = data.role;
      }
    });

  }


}
