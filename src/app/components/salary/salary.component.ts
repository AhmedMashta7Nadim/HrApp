import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SalaryService } from '../../Model/Salary/salary.service';
import { EmployeeService } from '../../Model/employee/employee.service';
import { Employee } from '../../Model/employee/employee';
import { Salary } from '../../Model/Salary/salary';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css',
})
export class SalaryComponent implements OnInit {
  Salary!: FormGroup;
  emps: Employee[] = [];
  SalaryList: Salary[] = [];
  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.loadDataSalary();
    this.Salary = this.fb.group({
      employeeId: [''], // معرّف الموظف
      date_Salarys: [''], // تاريخ الرواتب
      receipt_Date: [''], // تاريخ الاستلام
      issue_Date: [''], // تاريخ الإصدار
    });
  }

  async loadDataSalary(): Promise<Salary[]> {
    this.emps = await this.employeeService.getEmployeesPromise();
    let salares = await this.salaryService.getSalaries();
    this.SalaryList = salares;
    return salares;
  }

  async addSalary() {
    let formData = new FormData();
    if (this.Salary.valid) {
      // إضافة بيانات النموذج إلى FormData
      formData.append('employeeId', this.Salary.get('employeeId')?.value);
      formData.append('date_Salarys', this.Salary.get('date_Salarys')?.value);
      formData.append('receipt_Date', this.Salary.get('receipt_Date')?.value);
      formData.append('issue_Date', this.Salary.get('issue_Date')?.value);
    }

    try {
      // إرسال الطلب إلى الخادم لإضافة الراتب
      let request = await this.salaryService.addSalary(formData);

      // بعد الإضافة بنجاح، قم بتحديث البيانات دون إعادة تحميل الصفحة
      console.log('Salary added successfully:', request);

      // إعادة تحميل بيانات الرواتب
      await this.loadDataSalary();

      // يمكنك أيضًا إعادة تعيين النموذج إذا أردت
      this.Salary.reset();
    } catch (error) {
      console.error('Error adding salary:', error);
    }
  }
}
