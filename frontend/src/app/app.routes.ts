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

  // Default page → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login, title: 'Login' },

  // Protected Routes - Admin
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    title: 'Dashboard',
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },

  { 
    path: 'student', 
    component: StudentComponent, 
    title: 'Student',
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'faculty', 
    component: Faculty, 
    title: 'Faculty',
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'notice', 
    component: Notice, 
    title: 'Notice',
    canActivate: [AuthGuard]
  },
  { 
    path: 'attendance', 
    component: Attendance, 
    title: 'Attendance',
    canActivate: [AuthGuard]
  },
  { 
    path: 'fees', 
    component: Fees, 
    title: 'Fees',
    canActivate: [AuthGuard]
  },

  // If wrong URL
  { path: '**', redirectTo: 'login' }
];
