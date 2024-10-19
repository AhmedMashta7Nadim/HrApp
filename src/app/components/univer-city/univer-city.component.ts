import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface UniverCity {
  id: string | undefined;
  name: string;
}

@Component({
  selector: 'app-univer-city',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './univer-city.component.html',
  styleUrls: ['./univer-city.component.css']
})
export class UniverCityComponent implements OnInit {
  

  univerCities: UniverCity[] = [];
  newUniverCity: UniverCity = { id: undefined, name: '' };
  selectedUniverCity: UniverCity | undefined;

  private apiBaseUrl = 'https://localhost:7138/api/UniverCity';  // تأكد من تعديلها لتناسب API الخاص بك

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUniverCities();
  }

  // جلب جميع الجامعات
  getUniverCities(): void {
    this.http.get<UniverCity[]>(this.apiBaseUrl).subscribe({
      next: (response) => {
        this.univerCities = response;
      },
      error: (error) => {
        console.error('Error fetching UniverCities', error);
      },
      complete: () => {
        console.log('UniverCities data fetching completed');
      }
    });
  }

  addUniverCity(): void {
    this.http.post<UniverCity>(`${this.apiBaseUrl}Added`, this.newUniverCity).subscribe({
      next: (response) => {
        console.log('UniverCity added successfully', response);
        this.univerCities.push(response);
        this.newUniverCity = { id: undefined, name: '' }; // إعادة تعيين الحقول بعد الإضافة
      },
      error: (error) => {
        console.error('Error adding UniverCity', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    });
  }

  // تحديث اسم الجامعة باستخدام JSON Patch
  updateUniverCityName(): void {
    if (this.selectedUniverCity && this.selectedUniverCity.id) {
        const patchOperation = [
            { op: 'replace', path: '/name', value: this.selectedUniverCity.name }
        ];

        this.http.patch<void>(`${this.apiBaseUrl}/Patch/${this.selectedUniverCity.id}`, patchOperation)
            .subscribe({
                next: () => {
                    console.log('UniverCity name updated successfully');
                    this.getUniverCities(); // Reload the list after update
                },
                error: (error) => {
                    console.error('Error updating UniverCity name', error);
                }
            });
    }
  }
  // حذف جامعة
  deleteUniverCity(id: string | undefined): void {
    if (!id) {
      console.error('Invalid UniverCity ID');
      return;
    }

    this.http.delete<void>(`${this.apiBaseUrl}/Deleted?id=${id}`).subscribe({
      next: () => {
        console.log('UniverCity deleted successfully');
        // إزالة الجامعة المحذوفة من القائمة محليًا بعد نجاح الحذف
        this.univerCities = this.univerCities.filter(univerCity => univerCity.id !== id);
      },
      error: (error) => {
        console.error(`Error deleting UniverCity with ID ${id}`, error);
      }
    });
  }





  // تحديد الجامعة المختارة للتحديث
  selectUniverCity(univerCity: UniverCity): void {
    this.selectedUniverCity = { ...univerCity }; // إنشاء نسخة جديدة لمنع التعديل المباشر على القائمة
  }

  
}


