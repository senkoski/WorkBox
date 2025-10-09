import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { Partner } from '../../../models/user.model';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Parceiros</mat-card-title>
          <button mat-raised-button color="primary" routerLink="/partners/new"><mat-icon>add</mat-icon> Novo</button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="partners" class="full-width">
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nome</th><td mat-cell *matCellDef="let p">{{p.name}}</td></ng-container>
            <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef>Tipo</th><td mat-cell *matCellDef="let p">{{getTypeLabel(p.type)}}</td></ng-container>
            <ng-container matColumnDef="cnpjCpf"><th mat-header-cell *matHeaderCellDef>CNPJ/CPF</th><td mat-cell *matCellDef="let p">{{p.cnpjCpf}}</td></ng-container>
            <ng-container matColumnDef="phone"><th mat-header-cell *matHeaderCellDef>Telefone</th><td mat-cell *matCellDef="let p">{{p.phone}}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let p"><span class="status-badge" [class]="p.status">{{p.status === 'active' ? 'Ativo' : 'Inativo'}}</span></td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let p">
              <button mat-icon-button [routerLink]="['/partners', p.id]"><mat-icon>visibility</mat-icon></button>
              <button mat-icon-button [routerLink]="['/partners', p.id, 'edit']"><mat-icon>edit</mat-icon></button>
            </td></ng-container>
            <tr mat-header-row *matHeaderRowDef="['name','type','cnpjCpf','phone','status','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['name','type','cnpjCpf','phone','status','actions'];"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() { this.apiService.getAll<Partner>('partners').subscribe(p => this.partners = p); }
  getTypeLabel(t: string) { const l: any = { supplier: 'Fornecedor', customer: 'Cliente', service_provider: 'Prestador', carrier: 'Transportadora' }; return l[t] || t; }
}
