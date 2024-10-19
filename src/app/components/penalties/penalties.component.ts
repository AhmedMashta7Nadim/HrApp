import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // استيراد FormBuilder و FormGroup
import { PenaltiesService } from '../../Model/Penalties/penalties.service';
import { AllService } from '../../all.service';
import { Employee } from '../../Model/employee/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penalties',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './penalties.component.html',
  styleUrl: './penalties.component.css'
})
export class PenaltiesComponent implements OnInit {

  penaltiesForm: FormGroup; // form من نوع FormGroup
  selectedFile: File | null = null;
  emps: Employee[] = [];

  constructor(
    private penaltyService: PenaltiesService,
    private httpAll: AllService,
    private fb: FormBuilder // استخدام FormBuilder لبناء النموذج
  ) {
    // إعداد النموذج باستخدام FormBuilder
    this.penaltiesForm = this.fb.group({
      EmployeeId: ['', Validators.required],
      Date_Penalties: ['', Validators.required],
      Price_Penalties: ['', [Validators.required, Validators.min(0)]],
      Reason_Penalties: ['', Validators.required],
      file: [null]
    });
  }

  async ngOnInit(): Promise<void> {
    var e = await this.httpAll.getEmployeesPromise();
    e.forEach(element => {
      console.log(element.name);
      this.emps.push(element);
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit(): Promise<void> {
    if (this.penaltiesForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('EmployeeId', this.penaltiesForm.get('EmployeeId')?.value);
    formData.append('Date_Penalties', this.penaltiesForm.get('Date_Penalties')?.value);
    formData.append('Price_Penalties', this.penaltiesForm.get('Price_Penalties')?.value);
    formData.append('Reason_Penalties', this.penaltiesForm.get('Reason_Penalties')?.value);
    formData.append('path_file', "7");

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.penaltyService.addPenalty(formData).subscribe( (x)=>{
      console.log(x);
      
    })
    try {
      await this.penaltyService.addPenalty(formData);
      alert('Penalty added successfully!');
    } catch (error) {
      console.error('Error adding penalty:', error);
      alert('Failed to add penalty. Please try again.');
    }
  }
}
