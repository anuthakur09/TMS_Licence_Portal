import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserLicenceService } from 'src/app/service/user-licence.service';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss']
})

export class LicenceComponent implements OnInit {
  data: any = [];
  @Input() userId: number = 0;

  constructor(private _licenceService: UserLicenceService, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    debugger
    this.retrieveData();
    console.log(this.userId);
  }

  retrieveData() {
    this.data = this._licenceService.getUserLicences();
  }

}
