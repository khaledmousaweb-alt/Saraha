import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { UserResponse } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: UserResponse | null = null;
  activeTab = 'inbox';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.setActiveTabFromRoute();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.user = (response.result || response.data) ?? null;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
      }
    });
  }

  setActiveTabFromRoute(): void {
    const url = this.router.url;
    if (url.includes('/inbox')) this.activeTab = 'inbox';
    else if (url.includes('/sent')) this.activeTab = 'sent';
    else if (url.includes('/send')) this.activeTab = 'send';
    else if (url.includes('/share')) this.activeTab = 'share';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
