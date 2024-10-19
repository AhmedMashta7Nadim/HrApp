import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { City } from './city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apigetAllCites = 'https://localhost:7138/getAllCity'; // جلب جميع المدن
  private apigetCityById = 'https://localhost:7138/GetCityId'; // جلب مدينة واحدة
  private apiAddCity = 'https://localhost:7138/api/AddCity'; // إضافة مدينة جديدة
  private apiPatchCity = 'https://localhost:7138/api/City/Patch'; // تحديث مدينة
  private apiDeleteCity = 'https://localhost:7138/api/City/Delete'; // حذف مدينة (تم تعديل الرابط)

  constructor(private http: HttpClient) {}

  async getCities(): Promise<City[]> {
    try {
      const cities = await firstValueFrom(
        this.http.get<City[]>(this.apigetAllCites)
      );
      return cities;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  }

  async getCity(id: string): Promise<City> {
    try {
      const city = await firstValueFrom(
        this.http.get<City>(`${this.apigetCityById}/${id}`)
      );
      return city;
    } catch (error) {
      console.error('Error fetching city:', error);
      throw error;
    }
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiAddCity, city);
  }

  updateCity(city: City): Observable<void> {
    return this.http.put<void>(`${this.apiPatchCity}/${city.id}`, city);
  }

  deleteCity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteCity}?id=${id}`);
  }
}
