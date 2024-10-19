import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apigetAllEmployee = 'https://localhost:7138/api/Employee';  // يجب تعديلها لتناسب API الخاص بك
  private apigetEmployeeById = 'https://localhost:7138/api/Employee/GetEmployee';
  private apiAddEmployee='https://localhost:7138/api/AddEmployee';
  private apiPatchEmployee='https://localhost:7138/api/Employee/Patch';
  private apiDeleteEmplyee='https://localhost:7138/api/Employee/Deleted';
  
  constructor(private http: HttpClient) { }
  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteEmplyee}?id=${id}`);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apigetAllEmployee);
  }

  async getEmployeesPromise(): Promise<Employee[]> {
    return await firstValueFrom( this.http.get<Employee[]>(this.apigetAllEmployee));
  }


  getEmployee(id: string): Observable<Employee>
   {
    return this.http.get<Employee>(`${this.apigetEmployeeById}/${id}`);
  }

  addEmployee(formData: FormData): Observable<any> {
    return this.http.post(this.apiAddEmployee, formData);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiPatchEmployee}/${employee.id}`, employee);
  }


}
