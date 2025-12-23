import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full'
      },
      {
        path: 'inbox',
        loadComponent: () => import('./features/dashboard/inbox/inbox.component').then(m => m.InboxComponent)
      },
      {
        path: 'sent',
        loadComponent: () => import('./features/dashboard/sent/sent.component').then(m => m.SentComponent)
      },
      {
        path: 'send',
        loadComponent: () => import('./features/dashboard/send-message/send-message.component').then(m => m.SendMessageComponent)
      },
      {
        path: 'share',
        loadComponent: () => import('./features/dashboard/share-link/share-link.component').then(m => m.ShareLinkComponent)
      }
    ]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
