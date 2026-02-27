import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  showNavbar(): boolean {
    return this.router.url !== '/login' && this.authService.isLoggedIn();
  }

  confirmLogout() {
    // Close the modal first using Bootstrap
    const modalEl = document.getElementById('logoutModal');
    if (modalEl) {
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      modalEl.setAttribute('aria-hidden', 'true');
    }
    
    // Remove modal-open class and padding from body
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    
    // Remove all modal backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
