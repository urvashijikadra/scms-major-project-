import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { StudentComponent } from './pages/student/student';
import { Faculty } from './pages/faculty/faculty';
import { Notice } from './pages/notice/notice';
import { Attendance } from './pages/attendance/attendance';
import { Fees } from './pages/fees/fees';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // 👉 Default Page = Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 👉 Login Page
  { path: 'login', component: Login },

  // 👉 Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // 👉 Student Page
  {
    path: 'students',
    component: StudentComponent,
    canActivate: [AuthGuard]
  },

  // 👉 Faculty Page
  {
    path: 'faculty',
    component: Faculty,
    canActivate: [AuthGuard]
  },

  // 👉 Notice Page
  {
    path: 'notices',
    component: Notice,
    canActivate: [AuthGuard]
  },

  // 👉 Attendance Page
  {
    path: 'attendance',
    component: Attendance,
    canActivate: [AuthGuard]
  },

  // 👉 Fees Page
  {
    path: 'fees',
    component: Fees,
    canActivate: [AuthGuard]
  },

  // 👉 Wrong URL → Login
  { path: '**', redirectTo: 'login' }

];