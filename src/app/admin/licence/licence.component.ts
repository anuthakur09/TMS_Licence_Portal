import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { UserLicenceService } from 'src/app/service/user-licence.service';
import { RandomStringGenerator } from "./macAddress";

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss']
})

export class LicenceComponent implements OnInit {
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


// openDeleteEntryModal(id: number) {
//   this.deleteLicenceId = id;
// }

// closeDeleteModal() {
//   this.deleteLicenceId = 0;
// }

// deleteLicence() {
//   this._licenceService.delete(this.deleteLicenceId).subscribe((Response) => {
//     this.retrieveData();
//   });
// }

// openEditEntryModal(id: any) {
//   this.editLicenceId = id;

//   this.data.forEach((element: any) => {
//     if (id == element.id) {
//       this.licenceForm.patchValue({
//         licenceKeyType: element.licenceKeyType,
//         issueDate: element.issueDate,
//         expiryDate: element.expiryDate
//       });
//     }
//   });
// }

// closeEditModal() {
//   this.licenceForm.reset();
// }

// editLicence() {
//   let obj1 = {
//     id: this.editLicenceId,
//     userId: this.userId,
//     licenceKeyType: this.licenceForm.get('licenceKeyType')?.value,
//     issueDate: new Date(this.licenceForm.get('issueDate')?.value),
//     expiryDate: new Date(this.licenceForm.get('expiryDate')?.value),
//   };

//   this._licenceService.editUserLicence(obj1).subscribe((Response) => {
//     this.retrieveData();
//   });
//   this.licenceForm.reset();
//   this.editLicenceId = '';
// }


