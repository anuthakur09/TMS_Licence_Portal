import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  licenceForm: FormGroup;
  deleteLicenceId = 0;
  editLicenceId = '';
  expDate: Date | undefined;
  licenceTypes: any = [];
  createdLicence: any;
  devices: any = [];
  macAd = '';
  licenceType: any = 1006;

  constructor(
    private _licenceService: UserLicenceService,
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _userService: ServiceService,
    private licenceFormBuilder: FormBuilder
  ) {
    this.licenceForm = this.licenceFormBuilder.group({
      issueDate: new FormControl('', Validators.required),
      licenceKeyType: new FormControl(0, Validators.required),
      expiryDate: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.userId = +params['id'];
    });
    this.retrieveDevices();
    this.retrieveLicenceTypes();
    this.retrieveData();
    this.macAd = RandomStringGenerator.generateRandomString(17);
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
    debugger;
    this.licenceType = e.target?.value;
  }

  createUserLicence() {
    const today: Date = new Date();
    this.expDate = new Date(today);
    let LicenceKeyType = this.licenceForm.get('licenceKeyType')?.value;

    if (LicenceKeyType == 6) {
      this.expDate.setDate(today.getDate() + 15);
    } else if (LicenceKeyType == 7) {
      this.expDate.setDate(today.getDate() + 90);
    } else if (LicenceKeyType == 8) {
      this.expDate.setDate(today.getDate() + 180);
    }

    let obj1 = {
      userId: this.userId,
      licenceKeyType: this.licenceType,
      issueDate: today,
      expiryDate: this.expDate,
    }

    debugger;
    this._licenceService.create(obj1).subscribe((Response) => {
      if (Response) {
        this.createdLicence = Response;
        let obj2 = { LicenceKeyId: this.createdLicence.id, macAddress: this.macAd };

        this._licenceService.newDevice(obj2).subscribe((Response) => {
        })

        this.retrieveData();
      }
    });

    this.licenceForm.reset();
  }
}
