import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { UserResponse } from '../../core/models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserResponse | null = null;
  isLoading = true;
  shareLink = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.user = (response.result || response.data) ?? null;
        this.shareLink = `${environment.apiUrl}/send-message?userId=${this.user?.id}`;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error('Failed to load profile');
        this.isLoading = false;
      }
    });
  }

  copyUserId(): void {
    if (this.user?.id) {
      navigator.clipboard.writeText(this.user.id).then(() => {
        this.toastService.success('User ID copied to clipboard!');
      }).catch(() => {
        this.toastService.error('Failed to copy to clipboard');
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
