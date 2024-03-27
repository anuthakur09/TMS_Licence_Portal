import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from "../environment";

@Injectable({
  providedIn: 'root'
})

export class UserLicenceService {
  apiurl = `${Environment.appBaseURL}api/LicenceKey`;
  keyTypeApiUrl = `${Environment.appBaseURL}api/KeyType`;
  licenceDevicesUrl = `${Environment.appBaseURL}api/LicenceDevices/GetAllDevice`;

  constructor(
    private http: HttpClient,
  ) { }

  // users
  getUserLicences() {
    return this.http.get(`${this.apiurl}/GetAllKeys`);
  }

  create(data: any) {
    return this.http.post(this.apiurl, data);
  }

  editUserLicence(data: any) {
    return this.http.put(this.apiurl, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiurl}/${id}`);
  }



// key type
  getKeyType() {
    return this.http.get(`${this.keyTypeApiUrl}/GetKeyType`);
  }

  getKeyTypeById(id: number) {
    return this.http.get(`${this.keyTypeApiUrl}/${id}`);
  }


 
  // devices
  getDevices() {
    return this.http.get(this.licenceDevicesUrl);
  }

  newDevice(id: any){
    this.http.post(this.licenceDevicesUrl, id);
  }

}
