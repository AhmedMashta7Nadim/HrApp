import { UniverCityService } from './../../Model/UniverCity/univer-city.service';
import { UniverCity } from './../../Model/UniverCity/univerCity';
import { CityService } from './../../Model/city/city.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../Model/employee/employee';
import { EmployeeService } from '../../Model/employee/employee.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { City } from '../../Model/city/city';
import { firstValueFrom, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  emps: Employee[] = [];
  city: City | undefined;
  selectedEmployeeId: string | null = null; // خاصية لتحديد الموظف المختار

  selectedEmployee: Employee | undefined;
  showAddEmployeeForm: boolean = false;
  selectedFile: File | null = null;
  employeeForm: FormGroup;
  cityss: City[] = [];
  unvircitys: UniverCity[] = [];
  constructor(
    private cityService: CityService,
    private empsService: EmployeeService,
    private unerverService: UniverCityService,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.employeeForm = this.fb.group({
      name: [''],
      father: [''],
      lastName: [''],
      mother: [''],
      birthDate: [''],
      date_of_employment: [''],
      salary_basis: [''],
      functional_ID: [''],
      cityId: [''],
      univerCityId: [''],
      gendar: [''],
      //img: [null]
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.loadCities();
    this.loadUnverCity();
  }

  async loadCities(): Promise<void> {
    try {
      this.cityss = await this.cityService.getCities(); // جلب المدن من الخدمة
    } catch (error) {
      console.error('Error loading cities:', error); // التعامل مع الأخطاء في حالة حدوثها
    }
  }

  async loadUnverCity(): Promise<void> {
    this.unvircitys = await this.unerverService.getUniversities();
  }
  trackByunvercityId(index: number, UniverCity: UniverCity): string {
    if (typeof UniverCity.id !== 'string') {
      console.error(
        'Expected UniverCity.id to be a string, but got:',
        typeof UniverCity.id
      );
      return '';
    }
    return UniverCity.id;
  }

  trackByCityId(index: number, city: City): string {
    if (typeof city.id !== 'string') {
      console.error(
        'Expected city.id to be a string, but got:',
        typeof city.id
      );
      return '';
    }
    return city.id;
  }

  getEmployees(): void {
    this.empsService.getEmployees().subscribe({
      next: async (employees) => {
        // معالجة البيانات الخاصة بكل موظف
        for (let employee of employees) {
          const response = await this.cityService.getCity(
            employee.cityId as string
          );
          const responceUnvercity = await this.unerverService.getUniversity(
            employee.univerCityId as string
          );
          employee.cityId = response.city;
          employee.univerCityId = responceUnvercity.name;
        }

        // ترتيب الموظفين بناءً على 'date_of_employment' من الأحدث إلى الأقدم
        this.emps = employees.sort((a, b) => {
          const dateA = a.date_of_employment
            ? new Date(a.date_of_employment).getTime()
            : 0;
          const dateB = b.date_of_employment
            ? new Date(b.date_of_employment).getTime()
            : 0;
          return dateB - dateA; // ترتيب تنازلي (الأحدث أولاً)
        });
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      },
      complete: () => {
        console.log('Employee data fetching completed');
      },
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addEmployee(): void {
    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }
    const formData = new FormData();
    formData.append('Name', this.employeeForm.get('name')?.value);
    formData.append('Father', this.employeeForm.get('father')?.value);
    formData.append('LastName', this.employeeForm.get('lastName')?.value);
    formData.append('Mather', this.employeeForm.get('mather')?.value);
    formData.append(
      'Gendar',
      this.employeeForm.get('gendar')?.value.toString()
    );
    formData.append('BirthDate', this.employeeForm.get('birthDate')?.value);
    formData.append(
      'Date_of_employment',
      this.employeeForm.get('date_of_employment')?.value
    );
    formData.append(
      'Salary_basis',
      this.employeeForm.get('salary_basis')?.value.toString()
    );
    formData.append(
      'Functional_ID',
      this.employeeForm.get('functional_ID')?.value.toString()
    );
    formData.append('CityId', this.employeeForm.get('cityId')?.value);
    formData.append(
      'UniverCityId',
      this.employeeForm.get('univerCityId')?.value
    );

    this.empsService.addEmployee(formData).subscribe({
      next: (response) => {
        console.log('Employee added successfully', response);

        // أضف الموظف الجديد إلى القائمة الحالية بدون إعادة تحميل الصفحة
        this.emps.unshift(response); // إذا كان ترتيب الموظفين تنازليًا (الأحدث أولاً)

        this.employeeForm.reset();
        this.selectedFile = null;
        this.toggleAddEmployeeForm();
        alert('Employee added successfully');
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
          alert(`Client-side error: ${error.error.message}`);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was:`,
            error.error
          );
          alert(
            `Server-side error: ${error.status}. Please check the input data or try again later.`
          );
        }
      },
    });
  }

  updateEmployee(): void {
    if (this.selectedEmployee && this.selectedEmployee.id) {
      this.empsService.updateEmployee(this.selectedEmployee).subscribe({
        next: () => {
          console.log('Employee updated successfully');
          this.getEmployees();
          this.selectedEmployee = undefined;
        },
        error: (error) => {
          console.error('Error updating employee', error);
        },
      });
    }
  }

  async deleteEmployee(id: string | undefined): Promise<void> {
    if (!id) {
      console.error('Invalid Employee ID');
      return;
    }

    console.log('Deleting employee with ID:', id); // تحقق من قيمة id

    try {
      // انتظر حتى يتم تنفيذ الطلب
      await firstValueFrom(this.empsService.deleteEmployee(id));
      console.log('Employee deleted successfully');

      // قم بتصفية القائمة من الموظف الذي تم حذفه
      this.emps = this.emps.filter((employee) => employee.id !== id);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}`, error);
    }
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployeeId =
      this.selectedEmployeeId === employee.id ? null : employee.id || null;
  }

  toggleAddEmployeeForm(): void {
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }

  trackById(index: number, employee: Employee): string | undefined {
    return employee.id;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
