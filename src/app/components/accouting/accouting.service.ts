import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../Model/employee/employee';
import { AllService } from '../../all.service';

@Injectable({
  providedIn: 'root'
})
export class AccoutingService  {


  private postAccount = "https://localhost:7138/api/Accouting/Tokens";

  constructor(private http: HttpClient) { }
 

  AddAcountEmployee(data: any): Observable<any> {
    return this.http.post<any>(this.postAccount, data);
  }




}
