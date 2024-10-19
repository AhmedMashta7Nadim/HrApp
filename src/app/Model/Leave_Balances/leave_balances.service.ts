import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave_Balances } from './leave_Balances';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalancesService {

  private apigetAllLeaveBalance = 'https://localhost:7138/api/Leave_Balances';  // يجب تعديلها لتناسب API الخاص بك
  private apigetLeaveBalanceById = 'https://localhost:7138/api/LeaveBalance/GetLeaveBalance/{id}';
  private apiAddLeaveBalance='https://localhost:7138/api/Leave_BalancesAdded';
  private apiPatchLeaveBalance='https://localhost:7138/api/Leave_Balances/Patch';
  private apiDeleteLeaveBalance='https://localhost:7138/api/Leave_Balances/Deleted';

  constructor(private http: HttpClient) { }

  getLeaveBalances(): Observable<Leave_Balances[]> {
    return this.http.get<Leave_Balances[]>(this.apigetAllLeaveBalance);
  }

  getLeaveBalance(id: string): Observable<Leave_Balances> {
    return this.http.get<Leave_Balances>(`${this.apigetLeaveBalanceById}/${id}`);
  }

  addLeaveBalance(leaveBalances: Leave_Balances): Observable<Leave_Balances> {
    return this.http.post<Leave_Balances>(this.apiAddLeaveBalance, leaveBalances);
  }

  updateLeaveBalance(leaveBalances: Leave_Balances): Observable<void> {
    return this.http.put<void>(`${this.apiPatchLeaveBalance}/${leaveBalances.id}`, leaveBalances);
  }

  deleteLeaveBalance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteLeaveBalance}/${id}`);
  }
}
