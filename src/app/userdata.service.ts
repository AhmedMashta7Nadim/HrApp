import { Injectable, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserdataService implements OnInit {

  dataUser: string = "";
  public Token: string = "";
  public decode_Token: { [key: string]: any } = {};

  constructor() { }


  ngOnInit(): void {
    this.Token = localStorage.getItem('auth') || '';
    this.decodeToken(this.Token);
  }

  decodeToken(authintication: string) {
    this.decode_Token = jwtDecode(authintication);
  }
}


