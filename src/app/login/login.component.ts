import { DashbordComponent } from './../dashbord/dashbord.component';
import { routes } from './../app.routes';
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router  } from '@angular/router';  // استيراد Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formgroup: FormGroup;

  constructor(private login: LoginService, private fb: FormBuilder, private router: Router) {  // إضافة Router في الـ constructor
    this.formgroup = this.fb.group({
      UserName: [""],
      Password: [""]
    });
  }

  gets() {
    var formData = new FormData();
    formData.append("UserName", this.formgroup.get("UserName")?.value);
    formData.append("Password", this.formgroup.get("Password")?.value);

    formData.forEach(element => {
      console.log(element);
    });

    this.login.log(formData).subscribe(response => {
      console.log(response);  
      localStorage.setItem("auth", response);  

      this.router.navigate(['/dashbord/employee']); 
      
    }, error => {
      console.error('Error during login', error);
    });
  }
}
