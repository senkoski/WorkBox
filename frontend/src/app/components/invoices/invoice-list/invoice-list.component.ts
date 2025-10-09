import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { Invoice } from '../../../models/user.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Notas Fiscais</mat-card-title>
          <button mat-raised-button color="primary" routerLink="/invoices/new"><mat-icon>add</mat-icon> Nova</button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="invoices" class="full-width">
            <ng-container matColumnDef="number"><th mat-header-cell *matHeaderCellDef>Número</th><td mat-cell *matCellDef="let i">{{i.number}}</td></ng-container>
            <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef>Tipo</th><td mat-cell *matCellDef="let i">{{i.type === 'incoming' ? 'Entrada' : 'Saída'}}</td></ng-container>
            <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef>Data</th><td mat-cell *matCellDef="let i">{{i.date | date:'dd/MM/yyyy'}}</td></ng-container>
            <ng-container matColumnDef="totalValue"><th mat-header-cell *matHeaderCellDef>Valor</th><td mat-cell *matCellDef="let i">R$ {{i.totalValue}}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let i"><span class="status-badge" [class]="i.status">{{getStatusLabel(i.status)}}</span></td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let i">
              <button mat-icon-button [routerLink]="['/invoices', i.id]"><mat-icon>visibility</mat-icon></button>
            </td></ng-container>
            <tr mat-header-row *matHeaderRowDef="['number','type','date','totalValue','status','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['number','type','date','totalValue','status','actions'];"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() { this.apiService.getAll<Invoice>('invoices').subscribe(i => this.invoices = i); }
  getStatusLabel(s: string) { const l: any = { pending: 'Pendente', verified: 'Verificado', divergent: 'Divergente', cancelled: 'Cancelado' }; return l[s] || s; }
}
