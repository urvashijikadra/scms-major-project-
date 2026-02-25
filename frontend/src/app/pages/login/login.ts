import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  // ✅ LOGIN DATA
  email: string = '';
  password: string = '';

  // ✅ SIGNUP DATA
  name: string = '';
  role: string = 'user';

  // ✅ UI STATES
  isSignUp: boolean = false;
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // ✅ SWITCH LOGIN / SIGNUP
  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.error = '';
    this.successMessage = '';
  }

  // ✅ LOGIN
  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid login';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed';
      }
    });
  }

  // ✅ SIGNUP
  onSignUp() {
    if (!this.email || !this.password || !this.name) {
      this.error = 'Please fill all fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.authService.register(this.email, this.password, this.name, this.role).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {
          this.successMessage = 'Account created! Please login.';
          this.isSignUp = false;
          this.email = '';
          this.password = '';
          this.name = '';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}