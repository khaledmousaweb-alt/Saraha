import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../../core/services/message.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  messageForm: FormGroup;
  isLoading = false;
  characterCount = 0;
  maxLength = 500;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.messageForm = this.fb.group({
      receiverEmail: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    });

    this.messageForm.get('content')?.valueChanges.subscribe(value => {
      this.characterCount = value?.length || 0;
    });
  }

  onSubmit(): void {
    if (this.messageForm.invalid) {
      this.markFormGroupTouched(this.messageForm);
      return;
    }

    const senderId = this.authService.getCurrentUserId();
    if (!senderId) {
      this.toastService.error('You must be logged in to send messages');
      return;
    }

    this.isLoading = true;
    const { receiverEmail, content } = this.messageForm.value;

    this.messageService.sendMessage(content, receiverEmail, senderId).subscribe({
      next: () => {
        this.toastService.success('Message sent successfully!');
        this.messageForm.reset();
        this.characterCount = 0;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error(error.error?.message || 'Failed to send message');
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get receiverEmail() { return this.messageForm.get('receiverEmail'); }
  get content() { return this.messageForm.get('content'); }
}
