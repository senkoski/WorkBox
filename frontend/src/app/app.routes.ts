import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/users/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/users/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'pending',
        loadComponent: () => import('./components/users/user-pending/user-pending.component').then(m => m.UserPendingComponent),
        canActivate: [roleGuard('admin')]
      }
    ]
  },
  {
    path: 'companies',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/companies/company-list/company-list.component').then(m => m.CompanyListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/companies/company-form/company-form.component').then(m => m.CompanyFormComponent),
        canActivate: [roleGuard('admin')]
      },
      {
        path: ':id',
        loadComponent: () => import('./components/companies/company-detail/company-detail.component').then(m => m.CompanyDetailComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./components/companies/company-form/company-form.component').then(m => m.CompanyFormComponent),
        canActivate: [roleGuard('admin')]
      }
    ]
  },
  {
    path: 'assets',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/assets/asset-list/asset-list.component').then(m => m.AssetListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/assets/asset-form/asset-form.component').then(m => m.AssetFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      },
      {
        path: ':id',
        loadComponent: () => import('./components/assets/asset-detail/asset-detail.component').then(m => m.AssetDetailComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./components/assets/asset-form/asset-form.component').then(m => m.AssetFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      }
    ]
  },
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/products/product-list/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/products/product-form/product-form.component').then(m => m.ProductFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      },
      {
        path: ':id',
        loadComponent: () => import('./components/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./components/products/product-form/product-form.component').then(m => m.ProductFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      }
    ]
  },
  {
    path: 'invoices',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/invoices/invoice-list/invoice-list.component').then(m => m.InvoiceListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/invoices/invoice-form/invoice-form.component').then(m => m.InvoiceFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      },
      {
        path: ':id',
        loadComponent: () => import('./components/invoices/invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent)
      }
    ]
  },
  {
    path: 'partners',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/partners/partner-list/partner-list.component').then(m => m.PartnerListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/partners/partner-form/partner-form.component').then(m => m.PartnerFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      },
      {
        path: ':id',
        loadComponent: () => import('./components/partners/partner-detail/partner-detail.component').then(m => m.PartnerDetailComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./components/partners/partner-form/partner-form.component').then(m => m.PartnerFormComponent),
        canActivate: [roleGuard('admin', 'supervisor')]
      }
    ]
  },
  {
    path: 'reports',
    loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
