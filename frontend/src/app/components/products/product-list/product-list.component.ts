import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/user.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Estoque</mat-card-title>
          <button mat-raised-button color="primary" routerLink="/products/new"><mat-icon>add</mat-icon> Novo</button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="products" class="full-width">
            <ng-container matColumnDef="code"><th mat-header-cell *matHeaderCellDef>Código</th><td mat-cell *matCellDef="let p">{{p.code}}</td></ng-container>
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nome</th><td mat-cell *matCellDef="let p">{{p.name}}</td></ng-container>
            <ng-container matColumnDef="category"><th mat-header-cell *matHeaderCellDef>Categoria</th><td mat-cell *matCellDef="let p">{{p.category}}</td></ng-container>
            <ng-container matColumnDef="currentStock"><th mat-header-cell *matHeaderCellDef>Estoque</th><td mat-cell *matCellDef="let p">{{p.currentStock}}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let p"><span class="status-badge" [class]="p.status">{{p.status === 'active' ? 'Ativo' : 'Inativo'}}</span></td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let p">
              <button mat-icon-button [routerLink]="['/products', p.id]"><mat-icon>visibility</mat-icon></button>
              <button mat-icon-button [routerLink]="['/products', p.id, 'edit']"><mat-icon>edit</mat-icon></button>
            </td></ng-container>
            <tr mat-header-row *matHeaderRowDef="['code','name','category','currentStock','status','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['code','name','category','currentStock','status','actions'];"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() { this.apiService.getAll<Product>('products').subscribe(p => this.products = p); }
}
