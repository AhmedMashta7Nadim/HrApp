import { Download } from './download';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private apiget = 'https://localhost:7138/api/Employee/ExportEmployees';
  constructor(private http: HttpClient) { }

  gets(): Observable<Download> {
   try{
    return this.http.get<Download>(this.apiget);
   }catch(error){
    console.log(error);
    
   }
   return this.http.get<Download>(this.apiget);

  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.apiget}`;
    return this.http.get(url, { responseType: 'blob' });
  }


}
