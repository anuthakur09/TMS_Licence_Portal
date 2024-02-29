import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toastrService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminForm: FormGroup;
  constructor(private fb : FormBuilder, private router: Router, private toastService : ToastService) {
    
  this.adminForm = this.fb.group({
    UserName: new FormControl("",[Validators.required,Validators.email,]),
    Password: new FormControl("",[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)])
  })
    
  }
  ngOnInit(): void {

  }

  adminFormSubmission() {
    debugger
    // console.log(this.adminForm.value);
    this.toastService.error('somehting')
    // if(this.adminForm.valid){
    //   this.router.navigate(['/usermanagement'])
    // } else {
    // }
  }

}
