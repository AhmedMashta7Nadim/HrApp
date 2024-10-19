import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Rewards } from '../../Model/Rewards/rewards';
import { RewardsService } from '../../Model/Rewards/rewards.service';
import { AllService } from '../../all.service';
import { Employee } from '../../Model/employee/employee';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  rewardForm!: FormGroup;
  rewardsList: Rewards[] = [];
  selectedFile: File | null = null;  // الملف المرفق
  emps: Employee[] = [];

  constructor(
    private rewardService: RewardsService,
    private fb: FormBuilder,
    private httpAll: AllService
  ) {
    this.rewardForm = this.fb.group({
      employeeId: ['', Validators.required],           // FormControl للحقل النصي
      date_Rewards: ['', Validators.required],         // FormControl للتاريخ
      price_Rewards: ['', [Validators.required, Validators.min(0)]],        // FormControl للسعر
      reason_Reward: ['', Validators.required],        // FormControl للنص
      // path_file: [null]  // غير ضروري إذا لم يستخدم في النموذج
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadReward();  // تحميل المكافآت

    // جلب قائمة الموظفين
    this.emps = await this.httpAll.getEmployeesPromise();
  }

  async loadReward() {
    this.rewardsList = await this.rewardService.getRewards();
  }

  // دالة لتحديث الملف عند تغييره
  onFileChange(event: any): void {
    const file = event.target.files[0];  // استلام الملف
    if (file) {
      this.selectedFile = file;
    }
  }

  addReward(event: Event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    if (this.rewardForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append("EmployeeId", this.rewardForm.get("employeeId")?.value);
    formData.append("Date_Rewards", this.rewardForm.get("date_Rewards")?.value);
    formData.append("Price_Rewards", this.rewardForm.get("price_Rewards")?.value);
    formData.append("Reason_Reward", this.rewardForm.get("reason_Reward")?.value);

    // التحقق من وجود ملف مرفق قبل إضافته إلى FormData
    if (this.selectedFile) {
      formData.append("file", this.selectedFile, this.selectedFile.name);
    }

    this.rewardService.addRewards(formData)
      .subscribe(response => {
        console.log(response);
        alert('Reward added successfully!');
        this.loadReward(); // تحديث قائمة المكافآت
        this.rewardForm.reset(); // إعادة تعيين النموذج
        this.selectedFile = null; // إعادة تعيين الملف المرفق
      }, error => {
        console.error("Error adding reward:", error);
        if (error.error && error.error.message) {
          alert(`Failed to add reward: ${error.error.message}`);
        } else {
          alert('Failed to add reward. Please try again.');
        }
      });
  }
}
