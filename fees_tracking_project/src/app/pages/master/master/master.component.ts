import { Component, inject, OnInit } from '@angular/core';
import { MasterModel } from '../../../core/model/classes/master';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../core/model/service/master/master-service';
import { IApiResponseModel } from '../../../core/model/interface/APIresponse';
import { Router } from '@angular/router';


@Component({
  selector: 'app-master',
  imports: [FormsModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent implements OnInit {
  loggedInUser: any;
  newMasterObj: MasterModel = new MasterModel();
  masterservice = inject(MasterService);
  mastersList: MasterModel[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
     this.loadMasters();
    const userData = localStorage.getItem('user');

  if (userData) {
    // User is logged in → parse and continue loading data
    this.loggedInUser = JSON.parse(userData);
    this.loadMasters();
  } else {
    // No user found → redirect to login
    console.warn('User not logged in. Redirecting to login...');
    this.router.navigate(['/']);
  }
  }

  loadMasters() {
    this.masterservice.getAllMaster().subscribe({
      next: (res: IApiResponseModel) => {
        this.mastersList = res.data;
      },
    });
  }

  onSaveMaster() {
    this.masterservice.saveMaster(this.newMasterObj).subscribe({
      next: (result: IApiResponseModel) => {
        alert('Master saved successfully');
      },
    });
  }
 
  //   logout() {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }
  
}
