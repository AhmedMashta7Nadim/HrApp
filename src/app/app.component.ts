import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    DashbordComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'HrApp';
}
