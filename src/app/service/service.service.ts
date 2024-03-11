import { Injectable } from '@angular/core';
import { Environment } from "../environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  apiUrl = `${Environment.appBaseURL}api/KeyType`;
  rawData: any = [
    { id: 1, name: "Hero1", role: "Super Strength" },
    { id: 2, name: "Hero2", role: "Telekinesis" },
  ];

  constructor(private http: HttpClient) {

  }

  getHeroes() {
    return this.rawData;
  }

  saveCredentials(uName: string, pass: string) {
    localStorage.setItem("User Name", uName);
    localStorage.setItem("Password", pass);
  }

  createData(data: any) {
    // return this.http.post(this.apiUrl, data);
    this.rawData.push(data);
  }

  getAllEntries() {
    return this.http.get(this.apiUrl);
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
