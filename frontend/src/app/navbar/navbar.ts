import { Component, HostListener, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  isPanelOpen = false;
  authService = inject(AuthService);
  router = inject(Router);

  get user() {
    return this.authService.getUser();
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  // ✅ Confirm Logout from popup
  confirmLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.panel-container')) {
      this.isPanelOpen = false;
    }
  }
}