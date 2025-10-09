import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gerenciamento de Usuários</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="full-width">
            <ng-container matColumnDef="fullName">
              <th mat-header-cell *matHeaderCellDef>Nome</th>
              <td mat-cell *matCellDef="let user">{{ user.fullName }}</td>
            </ng-container>
            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef>Usuário</th>
              <td mat-cell *matCellDef="let user">{{ user.username }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let user">{{ user.email }}</td>
            </ng-container>
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Perfil</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip>{{ getRoleLabel(user.role) }}</mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let user">
                <span class="status-badge" [class]="user.status">{{ getStatusLabel(user.status) }}</span>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Ações</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="warn" (click)="deleteUser(user.id)" *ngIf="authService.hasRole('admin')">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { width: 100%; margin-top: 20px; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns = ['fullName', 'username', 'email', 'role', 'status', 'actions'];

  constructor(public apiService: ApiService, public authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getAll<User>('users').subscribe(users => this.users = users);
  }

  deleteUser(id: string) {
    if (confirm('Deseja excluir este usuário?')) {
      this.apiService.delete('users', id).subscribe(() => this.loadUsers());
    }
  }

  getRoleLabel(role: string): string {
    const roles: any = { admin: 'Admin', supervisor: 'Supervisor', user: 'Usuário' };
    return roles[role] || role;
  }

  getStatusLabel(status: string): string {
    const statuses: any = { active: 'Ativo', pending: 'Pendente', inactive: 'Inativo' };
    return statuses[status] || status;
  }
}
