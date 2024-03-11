import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from "../environment";
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})

export class UserLicenceService {
  apiurl = `${Environment.appBaseURL}api/licence`;
  userLicenceList = [
    { id: 0, userId: 0, licenceKeyType: 1, issueDate: "01/01/2024", expDate: "01/06/2024" },
    { id: 1, userId: 5, licenceKeyType: 2, issueDate: "02/02/2024", expDate: "02/07/2024" },
    { id: 2, userId: 0, licenceKeyType: 3, issueDate: "03/03/2024", expDate: "03/08/2024" },
    { id: 3, userId: 4, licenceKeyType: 3, issueDate: "03/03/2024", expDate: "03/08/2024" },
    { id: 4, userId: 4, licenceKeyType: 3, issueDate: "03/03/2024", expDate: "03/08/2024" },
    { id: 5, userId: 6, licenceKeyType: 3, issueDate: "03/03/2024", expDate: "03/08/2024" },
  ];

  constructor(
    private http: HttpClient,
    private _service: ServiceService
  ) {  }

  getUserLicences() {
    // return this.http.get(userId);
    return this.userLicenceList;
  }

  editUserLicence(id: any, data: any) {
    return this.http.put(id, data);
  }

}
