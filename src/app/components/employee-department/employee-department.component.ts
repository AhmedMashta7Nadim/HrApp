import { firstValueFrom } from 'rxjs';
import { EmployeeDepartmentService } from './../../Model/EmployeeDepartment/employee-department.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeDepartment } from '../../Model/EmployeeDepartment/employeeDepartment';
import { EmployeeService } from '../../Model/employee/employee.service';
import { DepartmentService } from '../../Model/Department/department.service';
import { Employee } from '../../Model/employee/employee';
import { Department } from '../../Model/Department/department';

@Component({
  selector: 'app-employee-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-department.component.html',
  styleUrl: './employee-department.component.css',
})
export class EmployeeDepartmentComponent implements OnInit {
  EmpDepLst: EmployeeDepartment[] = [];
  emps: Employee[] = [];
  deps: Department[] = [];
  depsString: string[] = [];
  employeeDepartmint!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empDepService: EmployeeDepartmentService,
    private emp: EmployeeService,
    private dep: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadDepEmp();
    this.employeeDepartmint = this.fb.group({
      EmployeeId: [''],
      DepartmentId: [''],
      EndAt: [''],
      Is_available: [false],
      Is_manager: [false],
    });
  }

  async loadDepEmp(): Promise<EmployeeDepartment[]> {
    this.emps = await this.emp.getEmployeesPromise();
    this.deps = await this.dep.getDepartments();
    this.emps.forEach((element) => {
      console.log(element.name);
    });
    return (this.EmpDepLst = await this.empDepService.getEmployeeDepartments());
  }

  // async selectedEmployee():Promise<Employee[]>{
  //  return
  // }
  onSubmit(): void {
    console.log(this.employeeDepartmint);
  }
  trackByemp(index: number, employee: Employee): string {
    if (typeof employee.id !== 'string') {
      console.error(
        'Expected city.id to be a string, but got:',
        typeof employee.id
      );
      return '';
    }
    return employee.id;
  }

  ChangeValue($event: Event) {
    const id = $event.target as HTMLInputElement;
    const isChecked = id.checked;
    const value = id.value;
    console.log(isChecked + ' ' + value);
    this.depsString.push(value);
  }

  async addDepartmintEmployee() {
    console.log('asd');

    // let formData = new FormData();
    // formData.append("employeeId", this.employeeDepartmint.get("EmployeeId")?.value);
    // formData.append("departmentId", this.employeeDepartmint.get("departmentId")?.value);
    // formData.append("endAt", this.employeeDepartmint.get("endAt")?.value);
    // formData.append("is_available", this.employeeDepartmint.get("isAvailable")?.value);
    // formData.append("is_manager", this.employeeDepartmint.get("isManager")?.value);
    // console.log(formData);
    // console.log();

    let formData2 = new FormData();

    this.depsString.forEach(async (value, key) => {
      console.log(value + 'zz');

      formData2.append(
        'EmployeeId',
        this.employeeDepartmint.get('EmployeeId')?.value
      );
      formData2.append('DepartmentId', value.toString());
      formData2.append('EndAt', this.employeeDepartmint.get('EndAt')?.value);
      formData2.append('path_File', 'zz');
      formData2.append(
        'Is_available',
        this.employeeDepartmint.get('Is_available')?.value
      );
      formData2.append(
        'Is_manager',
        this.employeeDepartmint.get('Is_manager')?.value
      );
      //await this.empDepService.addEmployeeDepartment(formData2);
      this.empDepService.addEmployeeDepartment1(formData2).subscribe((x) => {
        console.log(x);
      });
    });

    //console.log("Hello");

    // let x = await this.empDepService.addEmployeeDepartment(formData2);
  }
}
