import { Component } from '@angular/core';
import { StudentComponent } from './pages/student/student';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentComponent, RouterOutlet, NavbarComponent],
  templateUrl: './app.html'
})
export class AppComponent {}
