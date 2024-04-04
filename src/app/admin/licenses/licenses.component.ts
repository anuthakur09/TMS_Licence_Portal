import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { UserLicenceService } from 'src/app/service/user-licence.service';
import { RandomStringGenerator } from "./macAddressGenerator";

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})

export class LicensesComponent {
  data: any = [];
  filteredLicences: any = [];
  userId: number = 0;
  userName: any;
  deleteLicenceId = 0;
  editLicenceId = '';
  expDate: Date | undefined;
  licenceTypes: any = [];
  createdLicence: any;
  devices: any = [];
  macAd = '';
  licenceType: any = 'Trial';
  licenceKeyType: any;

  constructor(
    private _licenceService: UserLicenceService,
    private _activatedRoute: ActivatedRoute,
    private _userService: ServiceService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.userId = +params['id'];
    });
    this.retrieveDevices();
    this.retrieveLicenceTypes();
    this.retrieveData();
  }

  retrieveLicenceTypes() {
    this._licenceService.getKeyType().subscribe((response) => {
      this.licenceTypes = response;
    });
  }

  retrieveDevices() {
    this._licenceService.getDevices().subscribe((Response) => {
      this.devices = Response;
    });
  }

  getSpecificKeyType(Id: number) {
    const keyType = this.licenceTypes.find((type: any) => type.id === Id);
    return keyType ? keyType.title : 'Unknown';
  }

  getSpecificDevice(Id: any) {
    const Device = this.devices.find((element: any) => element.licenceKeyId === Id);
    if (Device) {
      return Device ? Device.macAddress : 'Unknown';
    }
  }

  retrieveData() {
    this.filteredLicences = [];
    this._licenceService.getUserLicences().subscribe((response) => {
      this.data = response;
      this.getUser();
      this.data.forEach((element: any) => {
        if (element.userId == this.userId) {
          this.filteredLicences.push(element);
        }
      });
    })
  }

  getUser() {
    this._userService.getUserbyId(this.userId).subscribe((Response: any) => {
      this.userName = Response.name;
    });
  }

  setLicenceType(e: any) {
    this.licenceType = e.target?.value;
  }

  createUserLicence() {
    const today: Date = new Date();
    this.expDate = new Date(today);

    if (this.licenceType == 'Trial') {
      this.expDate.setDate(today.getDate() + 15);
      this.licenceKeyType = 1009;
    } else if (this.licenceType == 'Standard') {
      this.expDate.setDate(today.getDate() + 90);
      this.licenceKeyType = 1010;
    } else if (this.licenceType == 'Premium') {
      this.expDate.setDate(today.getDate() + 180);
      this.licenceKeyType = 1011;
    }

    let obj1 = {
      userId: this.userId,
      licenceKeyType: this.licenceKeyType,
      issueDate: today,
      expiryDate: this.expDate,
    }

    // Call one 
    this.macAd = RandomStringGenerator.generateRandomString(17);
    this._licenceService.create(obj1).subscribe((Response) => {
      if (Response) {
        this.createdLicence = Response;

        let obj2 = {
          LicenceKeyId: this.createdLicence.id,
          macAddress: this.macAd
        };

        // Call two
        this._licenceService.newDevice(obj2).subscribe();

        this.retrieveData();
        this.retrieveDevices();
      }
    });
  }
}
