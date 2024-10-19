import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Vacation } from './vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private apigetVacation = 'https://localhost:7138/api/Vacation';  // يجب تعديلها لتناسب API الخاص بك
  private apigetVacationById = 'https://localhost:7138/api/Vacation/GetDepartment/{id}';
  private apiAddVacation='https://localhost:7138/api/VacationAdded';
  private apiPatchVacation='https://localhost:7138/api/Vacation/Patch';
  private apiDeleteVacation='https://localhost:7138/api/Vacation/Deleted';
  
  constructor(private http: HttpClient) { }

 async getVacations(): Promise<Vacation[]> {
    return await firstValueFrom(this.http.get<Vacation[]>(this.apigetVacation));
  }

  getVacation(id: string): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.apigetVacationById}/${id}`);
  }

  addVacation(vacation: FormData):Observable<Vacation>{
    return this.http.post<Vacation>(this.apiAddVacation, vacation);
  }

 async addVacationPromise(vacation: FormData): Promise<Vacation> {
    return await firstValueFrom(this.http.post<Vacation>(this.apiAddVacation, vacation));
  }

  updateVacation(vacation: Vacation): Observable<void> {
    return this.http.put<void>(`${this.apiPatchVacation}/${vacation.id}`, vacation);
  }

async  deleteVacation(id: string): Promise<void> {
  console.log(id+"zz");
  
    return await firstValueFrom(this.http.delete<void>(`${this.apiDeleteVacation}?id=${id}`));
  }
}
