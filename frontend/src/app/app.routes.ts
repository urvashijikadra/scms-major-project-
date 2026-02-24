import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { StudentComponent } from './pages/student/student';
import { Faculty } from './pages/faculty/faculty';
import { Notice } from './pages/notice/notice';
import { Attendance } from './pages/attendance/attendance';
import { Fees } from './pages/fees/fees';

export const routes: Routes = [

  // Default page → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login, title: 'Login' },

  // After login → Dashboard
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },

  // Other pages
  { path: 'student', component: StudentComponent, title: 'Student' },
  { path: 'faculty', component: Faculty, title: 'Faculty' },
  { path: 'notice', component: Notice, title: 'Notice' },
  { path: 'attendance', component: Attendance, title: 'Attendance' },
  { path: 'fees', component: Fees, title: 'Fees' },

  // If wrong URL
  { path: '**', redirectTo: 'login' }
];