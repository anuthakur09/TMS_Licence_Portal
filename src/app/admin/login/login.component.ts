import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toastrService.service';
import { ServiceService } from "../../service/service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  heroes: number[] = [];
  adminForm: FormGroup;

  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private _service: ServiceService
  ) {

    this.adminForm = this.fb.group({
      UserName: new FormControl("", [Validators.required, Validators.email,]),
      Password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
    })

  }


  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData() {
    // this._service.getAllEntries();
    this.data = this._service.getHeroes();
  }

  adminFormSubmission() {
    if (this.adminForm.valid) {
      
      this.router.navigate(['/usermanagement']);
      let val1 = this.adminForm.get('UserName')?.value;
      let val2 = this.adminForm.get('Password')?.value;
      this._service.saveCredentials(val1, val2);
      var obj1={
        title: "testanu"
      }
      this._service.createData(obj1);

    } else {
      console.log("Something is missing");
    }
  }

}
