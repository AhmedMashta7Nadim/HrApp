import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private push: string = "https://localhost:7138/api/Accouting/LogIn";

  constructor(private http: HttpClient) { }


  log(formData: FormData): Observable<string> {
    return this.http.post(this.push, formData, { responseType: 'text' });
  }


}
