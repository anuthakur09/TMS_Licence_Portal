import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  adminSignupForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }
  createForm() {
    this.adminSignupForm = this.fb.group({
      UserName: new FormControl("", [Validators.required, Validators.email,]),
      Password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      ConfirmPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)])
    })
  }
  adminSignupFormSubmission() {
    if (this.adminSignupForm.valid) {
      let pass = this.adminSignupForm.get('Password')?.value
      let cpass = this.adminSignupForm.get('ConfirmPassword')?.value
      if (pass == cpass) {
        this.router.navigate(['/users']);
      }
    }
  }


}
