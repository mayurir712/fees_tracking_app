import { Component, inject, OnInit } from '@angular/core';
import { MasterModel } from '../../../core/model/classes/master';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../core/model/service/master/master-service';
import { IApiResponseModel } from '../../../core/model/interface/APIresponse';

@Component({
  selector: 'app-master',
  imports: [FormsModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent implements OnInit {
  newMasterObj: MasterModel = new MasterModel();
  masterservice = inject(MasterService);
  mastersList: MasterModel[] = [];

  ngOnInit(): void {
    this.loadMasters();
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
}
