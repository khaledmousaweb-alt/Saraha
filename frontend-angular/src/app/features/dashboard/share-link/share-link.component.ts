import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-share-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.css']
})
export class ShareLinkComponent implements OnInit {
  shareLink = '';
  userId = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId() || '';
    this.shareLink = `${environment.apiUrl}/send-message?userId=${this.userId}`;
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.userId).then(() => {
      this.toastService.success('User ID copied to clipboard!');
    }).catch(() => {
      this.toastService.error('Failed to copy to clipboard');
    });
  }
}
