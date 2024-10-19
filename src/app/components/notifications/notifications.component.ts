import { NotificationsService } from './notifications.service';
import { Component, OnInit } from '@angular/core';
import { Vacation } from '../../Model/Vacation/vacation';
import { AllService } from '../../all.service';
import { VacationService } from '../../Model/Vacation/vacation.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../Model/employee/employee';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],

  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  lstVacation: Vacation[] = [];

  public VacationDectonary: {
    id: string,
    employeeId: any,
    start_Vacation: Date,
    end_Vacation: Date,
    noteBad: string,
    leave: any

  }[] = [];

  constructor(
    private all: AllService,
    private Notifications: NotificationsService
  ) { }
  ngOnInit(): void {
    this.Notifications.gets().subscribe((response) => {
      response.forEach(element => {
        // استدعاء الخدمة للحصول على تفاصيل الموظف
        this.all.getEmployeeId(element.employeeId!).subscribe((x) => {
          console.log(x.name);

          // إضافة البيانات إلى VacationDectonary بعد الحصول على بيانات الموظف
          this.VacationDectonary.push({
            id: element.id!,
            employeeId: x.name, // استخدام اسم الموظف المسترجع
            start_Vacation: element.start_Vacation!,
            end_Vacation: element.end_Vacation!,
            noteBad: element.noteBad!,
            leave: element.leave
          });
        });
      });
    });
  }

  getEmployee(id: string) {

  }

  UpdateOk(id: string) {
    var ide = document.getElementById(id);
    ide!.style.display = "none";
    this.Notifications.acceptVacation(id).subscribe((Edit) => {
      console.log(Edit);
    })
  }

  Deleted(id: string) {
    var ide = document.getElementById(id);
    ide!.style.display = "none";
    this.Notifications.deleted(id).subscribe((remove) => {
      console.log(remove);
    })
  }


}
