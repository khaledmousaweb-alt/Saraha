import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayout } from './features/layout/main-layout/main-layout';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home }
    ]
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
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
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
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
