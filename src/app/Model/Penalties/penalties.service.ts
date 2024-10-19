import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Penalties } from './penalties';

@Injectable({
  providedIn: 'root'
})
export class PenaltiesService {

  private apigetPenalties = 'https://localhost:7138/api/Penalties';  // يجب تعديلها لتناسب API الخاص بك
  private apigetPenaltiesById = 'https://localhost:7138/api/Penalties/GetDepartment/{id}';
  private apiPatchPenalties='https://localhost:7138/api/Penalties/Patch';
  private apiAddPenalties='https://localhost:7138/api/PenaltiesAdded';
  private apiDeletePenalties='https://localhost:7138/api/Penalties/Deleted';
 

  constructor(private http: HttpClient) { }

  getPenalties(): Observable<Penalties[]> {
    return this.http.get<Penalties[]>(this.apigetPenalties);
  }

  getPenalty(id: string): Observable<Penalties> {
    return this.http.get<Penalties>(`${this.apigetPenaltiesById}/${id}`);
  }

  addPenalty(penalties: FormData): Observable<any> 
  {
    let x=this.http.post(this.apiAddPenalties, penalties);
    return x;
  }
  addPenaltys(formData: FormData): Promise<any> {
    return firstValueFrom(this.http.post(this.apiAddPenalties, formData));
  }
  
  updatePenalty(penalties: Penalties): Observable<void> {
    return this.http.put<void>(`${this.apiPatchPenalties}/${penalties.id}`, penalties);
  }

  deletePenalty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeletePenalties}/${id}`);
  }
}
