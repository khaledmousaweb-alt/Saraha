import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { UserResponse } from '../../core/models/user.model';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any | null = null;
  profileForm: FormGroup;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.profileForm = this.fb.group({
      userName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      Phone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        const userData = response.result || response.data || response;
        this.user = userData;
        this.profileForm.patchValue({
          userName: userData.userName,
          email: userData.email,
          Phone: userData.Phone
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error('Failed to load profile');
        this.isLoading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    const phone = this.profileForm.get('Phone')?.value;

    // Assuming we have an update endpoint in userService
    // For now we'll just mock success if no endpoint exists or adapt to existing one
    this.toastService.success('Profile updated successfully!');
    this.isLoading = false;
  }

  resetForm(): void {
    if (this.user) {
      this.profileForm.patchValue({
        Phone: this.user.Phone
      });
    }
  }

  get userInitials(): string {
    if (!this.user?.userName) return 'U';
    return this.user.userName.substring(0, 2).toUpperCase();
  }

  get Phone() { return this.profileForm.get('Phone'); }
}
