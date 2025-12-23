import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  template: `
    <router-outlet />
    <app-toast />
  `,
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Saraha';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.initRevealObserver();
        this.initMagneticButtons();
      }, 500);
    });
  }

  ngAfterViewInit() {
    this.initRevealObserver();
    this.initMagneticButtons();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // This could also be done per-component for performance, 
    // but for the premium 'MindMarket' feel, we'll handle global magnetic elements.
  }

  private initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach(el => observer.observe(el));
  }

  private initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
      const b = btn as HTMLElement;
      b.addEventListener('mousemove', (e) => {
        const rect = b.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        b.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      b.addEventListener('mouseleave', () => {
        b.style.transform = `translate(0px, 0px)`;
      });
    });
  }
}
