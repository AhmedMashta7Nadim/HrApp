import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatcontrolService {
  private addMessageInChat: string = "https://localhost:7138/api/ChatMessage/AddMessage";

  constructor(private http: HttpClient) { }

  addMessage(chatinterface: FormData): Observable<any> {
    // عرض محتويات FormData في وحدة التحكم
    chatinterface.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.post(this.addMessageInChat, chatinterface);
  }

  


}
