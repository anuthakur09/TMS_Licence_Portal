import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModule, NgbModalOptions, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LicenceComponent } from '../licence/licence.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  userForm: FormGroup;
  data: any[] = [];
  deleteId: number = 0;
  nameOfUser: string = '';
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg',
    ariaLabelledBy: 'ProjectLocation'
  };

  constructor(private _service: ServiceService, private fb: FormBuilder, public modalService: NgbModal) {
    this.userForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(10)]),
    })
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData() {
    this._service.getAllEntries().subscribe((Data) => {
      this.data = Data;
    })
  }

  editEntry() {
    let obj1 = {
      id: 0,
      name: '',
      role: ''
    };

    obj1.id = this.userForm.get('id')?.value;
    obj1.name = this.userForm.get('name')?.value;
    obj1.role = this.userForm.get('role')?.value;
    this._service.sample(obj1.id, obj1);
    this.userForm.reset();
  }

  openEditEntryModal(id: number) {
    this.data.forEach(element => {
      if (id + 1 == element.id) {
        this.userForm.patchValue({
          id: element.id,
          name: element.name,
          role: element.role
        })
      }
    });

  }

  createEntry() {
    debugger;
    let obj1 = {
      id: 0,
      name: '',
      password: '',
      email: '',
      phone: ''
    };
    
    obj1.name = this.userForm.get('name')?.value;
    obj1.password = this.userForm.get('password')?.value;
    obj1.email = this.userForm.get('email')?.value;
    obj1.phone = this.userForm.get('phone')?.value;
    
    this._service.createData(obj1).subscribe((response) => {
      console.log(response);
    });
    
    this.userForm.reset();
  }

  openDeleteEntryModal(id: number) {
    this.deleteId = id;
    this.data.forEach(element => {
      if (id == element.id) {
        this.nameOfUser = element.name;
      }
    });
  }

  deleteEntry() {
    this.data.forEach(element => {
      if (this.deleteId == element.id) {
        this._service.deleteEntry(this.deleteId);
      }
    });
  }
  
  viewLicence(id: number) {
    debugger;
    const modalRef = this.modalService.open(LicenceComponent, this.ngbModalOptions);
    modalRef.componentInstance.userId = id;
    modalRef.result.then((x: any) => {
      if (x) {
        this.retrieveData();
      }
    });
  }

}