import { Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { SalaryComponent } from './components/salary/salary.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CityComponent } from './components/city/city.component';
import { UniverCityComponent } from './components/univer-city/univer-city.component';
import { EmployeeDepartmentComponent } from './components/employee-department/employee-department.component';
import { PenaltiesComponent } from './components/penalties/penalties.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { DepartmentComponent } from './components/department/department.component';
import { DownloadComponent } from './download/download.component';
import { AccoutingComponent } from './components/accouting/accouting.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PersonalinformationComponent } from './components/personalinformation/personalinformation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'dashbord',
    component: DashbordComponent,
    children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'salary', component: SalaryComponent },
      { path: 'city', component: CityComponent },
      { path: 'employeeDepartment', component: EmployeeDepartmentComponent },
      { path: 'penalties', component: PenaltiesComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'vacation', component: VacationComponent },
      { path: 'unviersity', component: UniverCityComponent },
      { path: 'download', component: DownloadComponent },
      { path: 'Accounting', component: AccoutingComponent },
      { path: 'Notifications', component: NotificationsComponent },
      { path: 'personalinformation', component: PersonalinformationComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'chat', component: ChatComponent },


      { path: '', redirectTo: '/employee', pathMatch: 'full' },
    ],
  },
];
