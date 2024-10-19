import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { UserdataService } from '../../userdata.service';
import { ChatcontrolService } from './chatcontrol.service';
import { Chat } from './chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  formgroup!: FormGroup;
  messages: { userName: string, text: string }[] = []; 

  constructor(
    private chatservice: ChatService,
    private fb: FormBuilder,
    public user: UserdataService,
    private chatCC: ChatcontrolService
  ) {
    this.formgroup = this.fb.group({
      message: ['']
    });
  }

  ngOnInit(): void {
    this.user.ngOnInit();
    this.chatservice.getAll().subscribe((messages) => {
      messages.forEach((element: { userName: string, masseg: string }) => {
        console.log(element);

        this.messages.push({ userName: element.userName, text: element.masseg });
      });
    });
    this.listenForMessages();
  }



  private listenForMessages() {
    this.chatservice.onMessageReceived().subscribe((message) => {
      try {
        console.log(`Message received: ${message.userName}: ${message.text}`);
        this.messages.push(message);


      } catch (err) {
        console.log(err + " error");
      }
    });
  }

  onClicked() {
    if (this.formgroup.valid) {
      const message = this.formgroup.get("message")?.value;
      const userName = this.user.decode_Token["UserName"];

      if (message) {


        var formData = new FormData();
        formData.append("UserName", userName);
        formData.append("Masseg", message);
        formData.append("dateTime", new Date().toISOString());
        formData.append("EmployeeId", this.user.decode_Token["EmployeeId"]);
        // var c = new Chat(message.text, message.userName, new Date(), "9f454410-6498-4080-4aed-08dcec91ec96");

        // var c = new Chat(message.text, message.userName, new Date(), "9f454410-6498-4080-4aed-08dcec91ec96");
        this.chatCC.addMessage(formData).subscribe((x) => {
          console.log(x);
        });
        //  this.messages.push({ userName, text: message });
        this.chatservice.sendMessage(userName, message)
          .then(() => {

            console.log("Message sent successfully");
            this.formgroup.reset();

          })
          .catch(err => console.error("Failed to send message:", err));
      } else {
        console.warn("Message cannot be empty.");
      }
    } else {
      console.warn("The form is invalid.");
    }
  }
}
