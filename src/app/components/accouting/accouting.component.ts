import { CommonModule } from '@angular/common';
import { Employee } from '../../Model/employee/employee';
import { AllService } from './../../all.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AccoutingService } from './accouting.service';

@Component({
  selector: 'app-accouting',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],

  templateUrl: './accouting.component.html',
  styleUrl: './accouting.component.css',
})
export class AccoutingComponent implements OnInit {
  formgroub!: FormGroup;
  lstEmp$!: Observable<any[]>;

  constructor(
    private all: AllService,
    private account: AccoutingService,
    private fb: FormBuilder
  ) {
    this.formgroub = this.fb.group({
      UserName: [''],
      Password: [''],
      Roll: [''],
      EmployeeId: [''],
    });
  }

  ngOnInit() {
    this.lstEmp$ = this.all.getEmployee();
  }

  onClick() {
    const formData = new FormData();
    formData.append('UserName', this.formgroub.get('UserName')?.value);
    formData.append('Password', this.formgroub.get('Password')?.value);
    formData.append('Roll', this.formgroub.get('Roll')?.value);
    formData.append('EmployeeId', this.formgroub.get('EmployeeId')?.value);

    const accountData = {
      UserName: this.formgroub.get('UserName')?.value,
      Password: this.formgroub.get('Password')?.value,
      Roll: this.formgroub.get('Roll')?.value,
      EmployeeId: this.formgroub.get('EmployeeId')?.value,
    };

    this.account.AddAcountEmployee(accountData).subscribe({
      next: (response) => {
        console.log(response);
        // عرض رسالة نجاح بعد الإضافة
        alert('Account added successfully!');

        // يمكنك أيضًا إعادة تعيين النموذج إذا أردت
        this.formgroub.reset();
      },
      error: (error) => {
        console.error('Error adding account:', error);
        // عرض رسالة خطأ في حالة حدوث خطأ
        alert('Error adding account. Please try again.');
      },
    });
  }
}
