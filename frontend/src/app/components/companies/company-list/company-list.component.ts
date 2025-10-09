import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { Company } from '../../../models/user.model';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Empresas</mat-card-title>
          <button mat-raised-button color="primary" routerLink="/companies/new"><mat-icon>add</mat-icon> Nova</button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="companies" class="full-width">
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nome</th><td mat-cell *matCellDef="let c">{{c.name}}</td></ng-container>
            <ng-container matColumnDef="cnpj"><th mat-header-cell *matHeaderCellDef>CNPJ</th><td mat-cell *matCellDef="let c">{{c.cnpj}}</td></ng-container>
            <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef>Tipo</th><td mat-cell *matCellDef="let c">{{c.type === 'headquarters' ? 'Matriz' : 'Filial'}}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let c"><span class="status-badge" [class]="c.status">{{c.status === 'active' ? 'Ativo' : 'Inativo'}}</span></td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let c">
              <button mat-icon-button [routerLink]="['/companies', c.id]"><mat-icon>visibility</mat-icon></button>
              <button mat-icon-button [routerLink]="['/companies', c.id, 'edit']"><mat-icon>edit</mat-icon></button>
            </td></ng-container>
            <tr mat-header-row *matHeaderRowDef="['name','cnpj','type','status','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['name','cnpj','type','status','actions'];"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() { this.apiService.getAll<Company>('companies').subscribe(c => this.companies = c); }
}
