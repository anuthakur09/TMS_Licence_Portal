import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
  
export class AdminComponent implements OnInit {

  page = 'login';
  
  handleRegistration(_page: string) { 
    this.page = _page;
  }

  ngOnInit(): void {
    
  }
}
