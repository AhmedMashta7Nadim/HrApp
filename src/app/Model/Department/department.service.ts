import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Department } from './department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiGetEmp = 'https://localhost:7138/api/Department/api/getDep_Emp';
  private apiAllDepAndeMPLOYEE =
    'https://localhost:7138/api/Department/GetTAll';
  private apigetAllDepartment = 'https://localhost:7138/api/Department'; // يجب تعديلها لتناسب API الخاص بك
  private apigetDepartmentById =
    'https://localhost:7138/api/Department/GetDepartment/{id}';
  private apiAddDepartment = 'https://localhost:7138/api/DepartmentAdded';
  private apiPatchDepartment = 'https://localhost:7138/api/Department/Patch';
  private apiDeleteDepartment = 'https://localhost:7138/api/Department/Deleted';
  private apidepEmps = 'https://localhost:7138/api/Department/getss?id=';
  private apiDepIde = 'https://localhost:7138/api/Department/getIdDep?id=';

  constructor(private http: HttpClient) {}

  getEmpAndDep(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetEmp);
  }

  async getDepartments(): Promise<any[]> {
    let result = await firstValueFrom(
      this.http.get<any[]>(this.apiAllDepAndeMPLOYEE)
    );
    console.log(result);

    return result;
  }

  getDepartmentss(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiGetEmp}`);
  }

  getDepartment(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apigetDepartmentById}/${id}`);
  }
  getDepartmentId(id: string): Observable<any[]> {
    console.log(id);

    return this.http.get<any[]>(`${this.apidepEmps}${id}`);
  }

  getDepartmentIde(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiDepIde}${id}`);
  }

  getDepAndEmp(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetEmp);
  }

  addDepartment(Name_Department: FormData): Observable<any> {
    return this.http.post(this.apiAddDepartment, Name_Department);
  }

  updateDepartment(department: Department): Observable<void> {
    return this.http.put<void>(
      `${this.apiPatchDepartment}/${department.id}`,
      department
    );
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteDepartment}?id=${id}`);
  }
}
