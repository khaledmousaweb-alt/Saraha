import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../core/services/message.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Message } from '../../../core/models/message.model';
import { MessageCardComponent } from '../../../shared/components/message-card/message-card.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, MessageCardComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  messages: Message[] = [];
  isLoading = true;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.toastService.error('User not authenticated');
      return;
    }

    this.isLoading = true;
    this.messageService.getInboxMessages(userId).subscribe({
      next: (response) => {
        this.messages = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error('Failed to load messages');
        this.isLoading = false;
      }
    });
  }

  onDeleteMessage(messageId: string): void {
    this.messageService.deleteMessage(messageId).subscribe({
      next: () => {
        this.toastService.success('Message deleted successfully');
        this.messages = this.messages.filter(m => m._id !== messageId);
      },
      error: () => {
        this.toastService.error('Failed to delete message');
      }
    });
  }
}
