import { Component, OnInit } from '@angular/core';
import { PageRoutsComponent } from './page-routs/page-routs.component';
import {
  NavigationEnd,
  Router,
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'; // التأكد من استيراد RouterLink و RouterLinkActive
import { AccoutingComponent } from '../components/accouting/accouting.component';
import { UserdataService } from '../userdata.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [
    PageRoutsComponent,
    AccoutingComponent,
    CommonModule,
    RouterLink, // إضافة RouterLink هنا
    RouterLinkActive, // إضافة RouterLinkActive هنا
  ],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  public Token: { [key: string]: any } = {};
  currentTitle: string = 'HR';

  constructor(
    private user: UserdataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.user.ngOnInit();
    this.Token = this.user.decode_Token;
    console.log(this.Token['UserName']);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setTitle();
      });
  }

  setTitle() {
    const route = this.activatedRoute.firstChild;
    if (route?.snapshot.url[0]) {
      const path = route.snapshot.url[0].path;

      switch (path) {
        case 'employee':
          this.currentTitle = 'Employees';
          break;
        case 'department':
          this.currentTitle = 'Department';
          break;
        case 'city':
          this.currentTitle = 'All City';
          break;
        case 'salary':
          this.currentTitle = 'Salary';
          break;
        case 'unviersity':
          this.currentTitle = 'Unviersity';
          break;
        case 'employeeDepartment':
          this.currentTitle = 'Employee Department';
          break;
        case 'penalties':
          this.currentTitle = 'Penalties';
          break;
        case 'rewards':
          this.currentTitle = 'Rewards';
          break;
        case 'vacation':
          this.currentTitle = 'Vacation';
          break;
        case 'maintenance':
          this.currentTitle = 'Maintenance';
          break;
        case 'Accounting':
          this.currentTitle = 'Add User';
          break;
        case 'Notifications':
          this.currentTitle = 'Notifications';
          break;
        case 'download':
          this.currentTitle = 'Download';
          break;
      }
    } else {
      this.currentTitle = 'HR';
    }
  }

  dropdownOpen = false;

  toggleDropdown(event: MouseEvent) {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
