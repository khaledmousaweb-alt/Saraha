import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();
  private nextId = 1;

  /**
   * Show success toast
   */
  success(message: string, duration: number = 3000): void {
    this.show('success', message, duration);
  }

  /**
   * Show error toast
   */
  error(message: string, duration: number = 4000): void {
    this.show('error', message, duration);
  }

  /**
   * Show info toast
   */
  info(message: string, duration: number = 3000): void {
    this.show('info', message, duration);
  }

  /**
   * Show warning toast
   */
  warning(message: string, duration: number = 3000): void {
    this.show('warning', message, duration);
  }

  /**
   * Show toast notification
   */
  private show(type: Toast['type'], message: string, duration: number): void {
    const toast: Toast = {
      id: this.nextId++,
      type,
      message
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto-dismiss after duration
    setTimeout(() => {
      this.remove(toast.id);
    }, duration);
  }

  /**
   * Remove toast by ID
   */
  remove(id: number): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toastsSubject.next([]);
  }
}
