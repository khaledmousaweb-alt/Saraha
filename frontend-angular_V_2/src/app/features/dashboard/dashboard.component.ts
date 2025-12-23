import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { filter } from 'rxjs/operators';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any | null = null;
  pageTitle = 'Overview';
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
    this.updateTitle();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        this.user = response.result || response.data || response;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
      }
    });
  }

  updateTitle() {
    const url = this.router.url;
    if (url.includes('inbox')) this.pageTitle = 'My Inbox';
    else if (url.includes('sent')) this.pageTitle = 'Sent Messages';
    else if (url.includes('send')) this.pageTitle = 'Send Feedback';
    else if (url.includes('share')) this.pageTitle = 'Share Profile';
    else if (url.includes('profile')) this.pageTitle = 'Account Settings';
    else this.pageTitle = 'Dashboard';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get userInitials(): string {
    if (!this.user?.userName) return 'U';
    return this.user.userName.substring(0, 2).toUpperCase();
  }
  
  get userName(): string {
    return this.user?.userName || 'User';
  }
  
  get userEmail(): string {
    return this.user?.email || '';
  }
}
