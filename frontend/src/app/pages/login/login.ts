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

  // ✅ VALIDATE EMAIL FORMAT
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ✅ VALIDATE NAME FORMAT
  isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  }

  // ✅ CHECK LOGIN FORM VALID
  isLoginFormValid(): boolean {
    return !!(this.email && this.password && this.isValidEmail(this.email) && this.password.length >= 4);
  }

  // ✅ CHECK SIGNUP FORM VALID
  isSignUpFormValid(): boolean {
    return !!(this.name && this.email && this.password && 
              this.isValidName(this.name) && 
              this.isValidEmail(this.email) && 
              this.password.length >= 4);
  }

  // ✅ GET PASSWORD STRENGTH (0-100)
  getPasswordStrength(): number {
    if (!this.password) return 0;
    
    let strength = 0;
    const password = this.password;
    
    // Length contribution (up to 40%)
    if (password.length >= 4) strength += 10;
    if (password.length >= 6) strength += 10;
    if (password.length >= 8) strength += 10;
    if (password.length >= 10) strength += 10;
    
    // Character variety contribution (up to 60%)
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
    
    return Math.min(strength, 100);
  }

  // ✅ GET PASSWORD STRENGTH TEXT
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Medium';
    return 'Strong';
  }

  // ✅ LOGIN
  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    if (this.password.length < 4) {
      this.error = 'Password must be at least 4 characters';
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

    if (!this.isValidName(this.name)) {
      this.error = 'Name must be 2-50 characters and contain only letters and spaces';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    if (this.password.length < 4) {
      this.error = 'Password must be at least 4 characters';
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = 'Processing...';

    this.authService.register(this.email, this.password, this.name, this.role).subscribe({
      next: (res: any) => {
        if (res.success) {
          // Auto-login after successful registration
          this.successMessage = 'Signing in...';
          this.authService.login(this.email, this.password).subscribe({
            next: (loginRes: any) => {
              this.loading = false;
              if (loginRes.success) {
                this.router.navigate(['/dashboard']);
              } else {
                this.error = 'Registration successful but login failed. Please login manually.';
                this.isSignUp = false;
                this.email = '';
                this.password = '';
                this.name = '';
              }
            },
            error: (loginErr) => {
              this.loading = false;
              this.error = 'Registration successful but login failed. Please login manually.';
              this.isSignUp = false;
              this.email = '';
              this.password = '';
              this.name = '';
            }
          });
        }
      },
      error: (err) => {
        this.loading = false;
        this.successMessage = '';
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}
