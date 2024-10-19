import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { EmployeeDepartment } from './employeeDepartment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDepartmentService {


  private apigetAllEmployeeDepartment = 'https://localhost:7138/api/EmployeeDepartment';  // يجب تعديلها لتناسب API الخاص بك
  private apigetEmployeeDepartmentById = 'https://localhost:7138/api/EmployeeDepartment/GetEmployeeDepartment/{id}';
  private apiAddEmployeeDepartment = 'https://localhost:7138/api/EmployeeDepartmentAdded';
  private apiPatchEmployeeDepartment = 'https://localhost:7138/api/EmployeeDepartment/Patch';
  private apiDeleteEmployeeDepartment = 'https://localhost:7138/api/EmployeeDepartment/Deleted';

  constructor(private http: HttpClient) { }

  async getEmployeeDepartments(): Promise<EmployeeDepartment[]> {
    return await firstValueFrom(this.http.get<EmployeeDepartment[]>(this.apigetAllEmployeeDepartment));
  }

  getEmployeeDepartment(id: string): Observable<EmployeeDepartment> {
    return this.http.get<EmployeeDepartment>(`${this.apigetEmployeeDepartmentById}/${id}`);
  }

  async addEmployeeDepartment(employeeDepartment: FormData): Promise<any> {

    employeeDepartment.forEach(element => {
      console.log(element);

    });
    let x = await firstValueFrom(this.http.post(this.apiAddEmployeeDepartment, employeeDepartment));
    return x;
  }

  addEmployeeDepartment1(employeeDepartment: FormData): Observable<any> {

employeeDepartment.forEach(element => {
  console.log(element + "z");
  
});

    return this.http.post<any>(this.apiAddEmployeeDepartment, employeeDepartment);
  }


  updateEmployeeDepartment(employeeDepartment: EmployeeDepartment): Observable<void> {
    return this.http.put<void>(`${this.apiPatchEmployeeDepartment}/${employeeDepartment.id}`, employeeDepartment);
  }

  deleteEmployeeDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteEmployeeDepartment}/${id}`);
  }
}
