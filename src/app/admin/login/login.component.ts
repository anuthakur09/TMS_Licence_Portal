import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ServiceService } from "../../service/service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  heroes: number[] = [];
  adminForm: FormGroup;

  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _service: ServiceService
  ) {

    this.adminForm = this.fb.group({
      UserName: new FormControl("", [Validators.required, Validators.email,]),
      Password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
    })

  }

  adminFormSubmission() {
    if (this.adminForm.valid) {
      this.router.navigate(['/users']);
    }
  }

}
