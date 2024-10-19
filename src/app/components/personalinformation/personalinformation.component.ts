import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../userdata.service';
import { AllService } from '../../all.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalinformation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalinformation.component.html',
  styleUrls: ['./personalinformation.component.css']
})
export class PersonalinformationComponent implements OnInit {

  public Token: { [key: string]: any } = {};


  public data: { [key: string]: any } = {};
  constructor(private user: UserdataService,private all:AllService) {}

  ngOnInit(): void {
    this.user.Token = localStorage.getItem('auth') || '';
    
    if (this.user.Token) {
      this.user.decodeToken(this.user.Token);
      this.Token = this.user.decode_Token;  
    }

    this.all.getEmployeeId(this.Token["EmployeeId"]).subscribe( (response)=>{
      console.log(response);
      
      this.data= response
    });
  }

}
