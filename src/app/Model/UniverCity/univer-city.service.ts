import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { UniverCity } from './univerCity';
import { Expansion } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UniverCityService {
  private apiBaseUrl = 'https://localhost:7138/api/UniverCity';
  private unvercitygetByIdApi = "https://localhost:7138/api/UniverCity/GetUniverCity";
  constructor(private http: HttpClient) { }

 async getUniversities(): Promise<UniverCity[]> {
    try{
      const get=await firstValueFrom( this.http.get<UniverCity[]>(this.apiBaseUrl));
      return get;
    }catch(error){
      throw error;
    }
  }


  async getUniversity(id: string): Promise<UniverCity> {
    try {
      const unvercity = await firstValueFrom(this.http.get<UniverCity>(`${this.unvercitygetByIdApi}/${id}`));
      return unvercity;
    } catch (error) {
      throw error;
    }
  }


  addUniversity(university: UniverCity): Observable<UniverCity> {
    return this.http.post<UniverCity>(`${this.apiBaseUrl}`, university);
  }

  updateUniversity(university: UniverCity): Observable<void> {
    return this.http.put<void>(`${this.apiBaseUrl}/Patch/${university.id}`, university);
  }

  deleteUniversity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/Deleted/${id}`);
  }
}
