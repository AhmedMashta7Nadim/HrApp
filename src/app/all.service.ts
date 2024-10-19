import { Injectable } from '@angular/core';
import { Employee } from './Model/employee/employee';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  private apigetAllEmployee = 'https://localhost:7138/api/Employee';
  private apigetAllEmployeeId = 'https://localhost:7138/api/Employee/GetEmployee';


  constructor(private http:HttpClient) { }
  async getEmployeesPromise(): Promise<Employee[]> {
    return await firstValueFrom( this.http.get<Employee[]>(this.apigetAllEmployee));
  }

  getEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apigetAllEmployee);
  }

  getEmployeeId(id:string):Observable<Employee>{
    return this.http.get<Employee>(`${this.apigetAllEmployeeId}/${id}`);
  }

}
