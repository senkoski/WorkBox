import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { Asset } from '../../../models/user.model';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Patrimônio</mat-card-title>
          <button mat-raised-button color="primary" routerLink="/assets/new"><mat-icon>add</mat-icon> Novo</button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="assets" class="full-width">
            <ng-container matColumnDef="code"><th mat-header-cell *matHeaderCellDef>Código</th><td mat-cell *matCellDef="let a">{{a.code}}</td></ng-container>
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nome</th><td mat-cell *matCellDef="let a">{{a.name}}</td></ng-container>
            <ng-container matColumnDef="category"><th mat-header-cell *matHeaderCellDef>Categoria</th><td mat-cell *matCellDef="let a">{{a.category}}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let a"><span class="status-badge" [class]="a.status">{{getStatusLabel(a.status)}}</span></td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let a">
              <button mat-icon-button [routerLink]="['/assets', a.id]"><mat-icon>visibility</mat-icon></button>
              <button mat-icon-button [routerLink]="['/assets', a.id, 'edit']"><mat-icon>edit</mat-icon></button>
            </td></ng-container>
            <tr mat-header-row *matHeaderRowDef="['code','name','category','status','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['code','name','category','status','actions'];"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() { this.apiService.getAll<Asset>('assets').subscribe(a => this.assets = a); }
  getStatusLabel(s: string) { const l: any = { in_use: 'Em Uso', maintenance: 'Manutenção', available: 'Disponível', retired: 'Baixado' }; return l[s] || s; }
}
