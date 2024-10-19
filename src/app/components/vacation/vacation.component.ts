import { endWith, pipe } from 'rxjs';
import { Vacation } from '../../Model/Vacation/vacation';
import { VacationService } from './../../Model/Vacation/vacation.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllService } from '../../all.service';
import { Employee } from '../../Model/employee/employee';

@Component({
  selector: 'app-vacation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vacation.component.html',
  styleUrl: './vacation.component.css',
})
export class VacationComponent implements OnInit {
  lestVacation: Vacation[] = [];
  VacationData!: FormGroup;
  lstEmp: Employee[] = [];

  constructor(
    private vacationService: VacationService,
    private all: AllService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.all.getEmployee().subscribe((response) => {
      this.lstEmp = response;
    });

    this.loadVacation();
    this.VacationData = this.fb.group({
      employeeId: '',
      start_Vacation: '',
      end_Vacation: '',
      leave: '',
      noteBad: '',
      acceptance: false,
    });
  }

  addVacation() {
    let formData = new FormData();
    formData.append('employeeId', this.VacationData.get('employeeId')?.value);
    formData.append(
      'start_Vacation',
      this.VacationData.get('start_Vacation')?.value
    );
    formData.append(
      'end_Vacation',
      this.VacationData.get('end_Vacation')?.value
    );
    formData.append('leave', this.VacationData.get('leave')?.value);
    formData.append('noteBad', this.VacationData.get('noteBad')?.value);
    formData.append('acceptance', this.VacationData.get('acceptance')?.value);
    formData.forEach((element) => {
      console.log(element);
    });
    this.vacationService.addVacation(formData).subscribe((request) => {
      console.log(request);
    });
  }

  async loadVacation(): Promise<Vacation[]> {
    this.lestVacation = await this.vacationService.getVacations();
    return this.lestVacation;
  }

  async deleteVacation(id: any) {
    console.log(id);
    id as string;
    await this.vacationService.deleteVacation(id);
  }
}
