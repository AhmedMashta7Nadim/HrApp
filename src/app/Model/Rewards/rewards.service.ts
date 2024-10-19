import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Rewards } from './rewards';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private apigetRewards = 'https://localhost:7138/api/Rewards';  // يجب تعديلها لتناسب API الخاص بك
  private apigetRewardsById = 'https://localhost:7138/api/Rewards/GetDepartment/{id}';
  private apiAddRewards = 'https://localhost:7138/api/RewardsAdded';
  private apiPatchRewards = 'https://localhost:7138/api/Rewards/Patch';
  private apiDeleteRewards = 'https://localhost:7138/api/Rewards/Deleted';
 
  constructor(private http: HttpClient) { }

  async getRewards(): Promise<Rewards[]> {
    const observable: Observable<Rewards[]> = this.http.get<Rewards[]>(this.apigetRewards);
    return lastValueFrom(observable);
  }

  async getReward(id: string): Promise<Rewards> {
    const observable: Observable<Rewards> = this.http.get<Rewards>(`${this.apigetRewardsById}/${id}`);
    return lastValueFrom(observable);
  }
  addRewards(formData: FormData): Observable<any> {
    formData.forEach(element => {
      console.log(element);
      
    });
    return this.http.post<any>(this.apiAddRewards, formData);
  }

  async addReward(rewards: FormData): Promise<Rewards> {
    rewards.forEach((key,value) => {
      console.log(key);
    });
    return  firstValueFrom(this.http.post(this.apiAddRewards, rewards));
  }
  


  async updateReward(rewards: Rewards): Promise<void> {
    const observable: Observable<void> = this.http.put<void>(`${this.apiPatchRewards}/${rewards.id}`, rewards);
    return lastValueFrom(observable);
  }

  async deleteReward(id: string): Promise<void> {
    const observable: Observable<void> = this.http.delete<void>(`${this.apiDeleteRewards}/${id}`);
    return lastValueFrom(observable);
  }
}
