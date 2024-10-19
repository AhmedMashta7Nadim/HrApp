import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  public messageReceivedSubject = new Subject<{ userName: string, text: string }>();
  private getAllMasseg:string="https://localhost:7138/api/ChatMessage/getAllMasseg";

  constructor(private http:HttpClient) {
    this.createConnection();
  }

  private createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7138/chat")
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection connected");
        this.AddMessageListener();
      })
      .catch((err) => console.error("Error while starting connection: ", err));

    this.hubConnection.onreconnecting((error) => {
      console.warn("Connection lost, attempting to reconnect...", error);
    });

    this.hubConnection.onreconnected((connectionId) => {
      console.log("Reconnected to SignalR with connection ID:", connectionId);
    });

    this.hubConnection.onclose((error) => {
      console.error("Connection closed. Trying to reconnect...", error);
      setTimeout(() => this.createConnection(), 3000);
    });
  }

  public async sendMessage(userName: string, message: string): Promise<void> {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      try {
        await this.hubConnection.invoke("SendMasseg", userName, message);
      } catch (err) {
        console.error("Error sending message: ", err);
      }
    } else {

      console.warn("Connected Error");
    }
  }

  private AddMessageListener() {
    this.hubConnection.on("SendAll", (userName: string, message: string) => {
      console.log(`Message from ${userName}: ${message}`);
      this.messageReceivedSubject.next({ userName, text: message });
    });
  }

  public onMessageReceived(): Observable<any> {
    return this.messageReceivedSubject.asObservable();
  }

  getAll():Observable<any>{
   return this.http.get<any>(this.getAllMasseg);
  }


}

