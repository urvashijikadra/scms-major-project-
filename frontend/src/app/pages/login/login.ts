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
  email = '';
  password = '';
  name = '';
  role = 'user';
  error = '';
  loading = false;
  isSignUp = false;
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.error = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  onSignUp() {
    if (!this.email || !this.password || !this.name) {
      this.error = 'Please fill all fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.authService.register(this.email, this.password, this.name, this.role).subscribe({
      next: (res) => {
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
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
