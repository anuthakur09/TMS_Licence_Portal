import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  constructor(private fb : FormBuilder, private router: Router) {
    
  this.adminForm = this.fb.group({
    UserName: new FormControl("",[Validators.required,Validators.email,]),
    Password: new FormControl("",[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)])
  })
    
  }
  ngOnInit(): void {

  }


  adminFormSubmission() {
    debugger
    console.log(this.adminForm.value);
    if(this.adminForm.valid){
      this.router.navigate(['/usermanagement'])
    }
  }

}
