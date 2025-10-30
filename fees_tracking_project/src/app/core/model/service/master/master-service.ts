import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterModel } from '../../classes/master';
import { IApiResponseModel } from '../../interface/APIresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {}
 getAllMaster(): Observable<IApiResponseModel> {
      return this.http.get<IApiResponseModel>('https://feestracking.freeprojectapi.com/api/Master/get-all-masters');
   }

    saveMaster(obj: MasterModel): Observable<IApiResponseModel>{
      return this.http.post<IApiResponseModel>('https://feestracking.freeprojectapi.com/api/Master/create-master', obj);
   }
  }