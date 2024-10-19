import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacation } from '../../Model/Vacation/vacation';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private VacationData = "https://localhost:7138/api/Vacation/VacationFalse";
  private patchVacationUrl="https://localhost:7138/api/Vacation/Patch";
  private deletes="https://localhost:7138/api/Vacation/Deleted";
  constructor(private http: HttpClient) { }

  gets(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.VacationData);
  }

  acceptVacation(id: string): Observable<any> {
    const url = `${this.patchVacationUrl}?id=${id}`;
    const patchData = [
        { op: 'replace', path: '/Acceptance', value: true }
    ];

    return this.http.patch(url, patchData);
}

deleted(id:string):Observable<any>{
  return this.http.delete<any>(`${this.deletes}?id=${id}`);
}



}
