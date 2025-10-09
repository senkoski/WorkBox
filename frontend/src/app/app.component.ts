import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  template: `
    <div class="app-container" *ngIf="authService.isAuthenticated()">
      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="app-title">Workbox</span>
        <span class="spacer"></span>
        <button mat-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
          <span>{{ currentUser()?.fullName }}</span>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/users/profile">
            <mat-icon>person</mat-icon>
            <span>Meu Perfil</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Sair</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer mode="side" opened class="sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Dashboard</span>
            </a>
            
            <a mat-list-item routerLink="/assets" routerLinkActive="active">
              <mat-icon matListItemIcon>inventory_2</mat-icon>
              <span matListItemTitle>Patrimônio</span>
            </a>
            
            <a mat-list-item routerLink="/products" routerLinkActive="active">
              <mat-icon matListItemIcon>inventory</mat-icon>
              <span matListItemTitle>Estoque</span>
            </a>
            
            <a mat-list-item routerLink="/invoices" routerLinkActive="active">
              <mat-icon matListItemIcon>receipt</mat-icon>
              <span matListItemTitle>Notas Fiscais</span>
            </a>
            
            <a mat-list-item routerLink="/partners" routerLinkActive="active">
              <mat-icon matListItemIcon>business</mat-icon>
              <span matListItemTitle>Parceiros</span>
            </a>
            
            <a mat-list-item routerLink="/companies" routerLinkActive="active">
              <mat-icon matListItemIcon>apartment</mat-icon>
              <span matListItemTitle>Empresas</span>
            </a>
            
            <a mat-list-item routerLink="/users" routerLinkActive="active" *ngIf="isAdminOrSupervisor()">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>Usuários</span>
            </a>
            
            <a mat-list-item routerLink="/reports" routerLinkActive="active">
              <mat-icon matListItemIcon>assessment</mat-icon>
              <span matListItemTitle>Relatórios</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>

    <div class="auth-container" *ngIf="!authService.isAuthenticated()">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .app-title {
      font-size: 20px;
      font-weight: 500;
      margin-left: 16px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .sidenav {
      width: 250px;
      padding-top: 16px;
    }

    .content {
      padding: 20px;
    }

    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    mat-list-item.active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    ::ng-deep .mat-mdc-list-item-title {
      margin-left: 16px;
    }
  `]
})
export class AppComponent {
  currentUser = computed(() => this.authService.getCurrentUser());

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
  }

  isAdminOrSupervisor(): boolean {
    return this.authService.hasRole('admin', 'supervisor');
  }
}
