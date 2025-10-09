import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-pending',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>Usuários Pendentes de Aprovação</mat-card-title></mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users">
            <ng-container matColumnDef="fullName"><th mat-header-cell *matHeaderCellDef>Nome</th><td mat-cell *matCellDef="let user">{{user.fullName}}</td></ng-container>
            <ng-container matColumnDef="email"><th mat-header-cell *matHeaderCellDef>Email</th><td mat-cell *matCellDef="let user">{{user.email}}</td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let user"><button mat-raised-button color="primary" (click)="approve(user.id)">Aprovar</button></td></ng-container>
            <tr mat-header-row *matHeaderRowDef="['fullName','email','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['fullName','email','actions'];"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class UserPendingComponent implements OnInit {
  users: User[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() { this.loadUsers(); }
  loadUsers() { this.apiService.getAll<User>('users', { status: 'pending' }).subscribe(u => this.users = u); }
  approve(id: string) { this.apiService.post(`users/${id}/approve`, {}).subscribe(() => this.loadUsers()); }
}
