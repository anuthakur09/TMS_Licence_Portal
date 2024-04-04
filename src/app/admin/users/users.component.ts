import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userForm: FormGroup;
  data: any[] = [];
  deleteId: number = 0;
  nameOfUser: string = '';


  constructor(
    private _service: ServiceService,
    private fb: FormBuilder,
    public _router: Router
  ) {
    this.userForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(10)]),
      role: new FormControl("", [Validators.required])
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
      id: this.userForm.get('id')?.value,
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      role: this.userForm.get('role')?.value,
    };

    this._service.updateEntry(obj1).subscribe((Response) => {
      console.log(Response);
    })

    this.userForm.reset();
  }

  openEditEntryModal(id: number) {
    this.data.forEach(element => {
      if (id == element.id) {
        this.userForm.patchValue({
          id: element.id,
          name: element.name,
          email: element.email,
          phone: element.phone,
          password: element.password,
          role: element.role
        })
      }
    });

  }

  createEntry() {
    let obj1 = {
      id: 0,
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      role: this.userForm.get('role')?.value
    };

    this._service.createData(obj1).subscribe((response) => {
      console.log(response);
      this.retrieveData();
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
    debugger;
    this._service.deleteEntry(this.deleteId).subscribe((Response) => {
      console.log(Response);
    })
  }

  viewLicence(id: number) {
    this._router.navigate(['/licenses', id]);
  }
}
