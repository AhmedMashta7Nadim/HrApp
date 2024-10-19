import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Salary } from './salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private apigetSalary = 'https://localhost:7138/api/Salary';  
  private apigetSalaryById = 'https://localhost:7138/api/Salary/GetDepartment/{id}';
  private apiAddSalary='https://localhost:7138/api/SalaryAdded';
  private apiPatchSalary='https://localhost:7138/api/Salary/Patch';
  private apiDeleteSalary='https://localhost:7138/api/Salary/Deleted';
 

  constructor(private http: HttpClient) { }

  async getSalaries(): Promise<Salary[]> {
    return await firstValueFrom(this.http.get<Salary[]>(this.apigetSalary));
  }

  getSalary(id: string): Observable<Salary> {
    return this.http.get<Salary>(`${this.apigetSalaryById}/${id}`);
  }

 async addSalary(salary: FormData): Promise<Salary> {
    return await firstValueFrom(this.http.post<Salary>(this.apiAddSalary, salary));
  }

  // updateSalary(salary: Salary): Observable<void> {
  //   return this.http.put<void>(`${this.apiPatchSalary}/${salary.id}`, salary);
  // }

  deleteSalary(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteSalary}/${id}`);
  }
}
