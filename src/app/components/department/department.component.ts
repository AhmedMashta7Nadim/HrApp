import { DepartmentService } from './../../Model/Department/department.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Department } from '../../Model/Department/department';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: any[] = []; // متغير لتحديد القسم المحدد
  ShowAdded: boolean = false;
  departmentForm!: FormGroup;
  showEmployeeDep: boolean = false;
  alertMessage: string = '';
  departmentToDeleteId: string | undefined = undefined; // لتخزين معرف القسم الذي سيتم حذفه
  showConfirmation: boolean = false; // لإظهار نافذة التأكيد

  constructor(
    private http: HttpClient,
    private depServise: DepartmentService,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      name_Department: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.loadDepartments();
  }

  async loadDepartments(): Promise<Department[]> {
    try {
      const departments = await this.depServise.getDepartments();
      console.log('True');
      this.departments = departments;
      return departments;
    } catch (error) {
      console.log('Errors');
      throw error;
    }
  }

  trackById(index: number, Department: Department): string | undefined {
    return Department.id;
  }

  existAdded(): boolean {
    console.log(this.ShowAdded);
    return (this.ShowAdded = !this.ShowAdded);
  }

  async AddDep() {
    const formData = new FormData();
    formData.append(
      'name_Department',
      this.departmentForm.get('name_Department')?.value
    );

    try {
      const addedDepartment = await firstValueFrom(
        this.depServise.addDepartment(formData)
      );
      console.log('Department added successfully:', addedDepartment);
      this.alertMessage = 'Department added successfully!';

      // تحديث القائمة مباشرةً بعد الإضافة
      this.departments.push(addedDepartment);

      // إعادة ضبط النموذج
      this.departmentForm.reset();
    } catch (error) {
      console.error('Error adding department:', error);
      this.alertMessage = 'Failed to add department!';
    }
  }

  closeAlert(): void {
    this.alertMessage = '';
  }

  showAlert(message: string): void {
    this.alertMessage = message;
    setTimeout(() => {
      this.closeAlert();
    }, 3000); // الرسالة تختفي بعد 3 ثوانٍ
  }

  viewDepartment(department: Department): void {
    this.selectedDepartment = [];
    this.depServise
      .getDepartmentIde(department.id as string)
      .subscribe((zx) => {
        for (const employee of zx['employees']) {
          // إضافة كل عنصر (الموظف) إلى selectedDepartment
          this.selectedDepartment.push(employee);
          console.log(employee);
        }
      });
    this.ToogleViewEmployee();
  }

  confirmDelete(id: string | undefined) {
    this.departmentToDeleteId = id;
    this.showConfirmation = true; // إظهار نافذة التأكيد
  }

  cancelDelete() {
    this.departmentToDeleteId = undefined;
    this.showConfirmation = false; // إخفاء نافذة التأكيد
  }

  async deleteDepartment() {
    if (!this.departmentToDeleteId) {
      console.error('Invalid ID: ID is undefined or null.');
      this.alertMessage = 'Failed to delete department: Invalid ID!';
      return;
    }

    try {
      await firstValueFrom(
        this.depServise.deleteDepartment(this.departmentToDeleteId)
      );
      console.log('Department deleted successfully');
      this.alertMessage = 'Department deleted successfully!';

      // إزالة القسم من القائمة بعد الحذف
      this.departments = this.departments.filter(
        (dep) => dep.id !== this.departmentToDeleteId
      );
      this.showConfirmation = false; // إخفاء نافذة التأكيد بعد الحذف
    } catch (error) {
      console.error('Error deleting department:', error);
      this.alertMessage = 'Failed to delete department!';
    }
  }

  ToogleViewEmployee(): boolean {
    console.log(this.showEmployeeDep);
    return (this.showEmployeeDep = !this.showEmployeeDep);
  }
}
