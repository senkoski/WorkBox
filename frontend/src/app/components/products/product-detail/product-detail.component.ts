import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/user.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="container" *ngIf="product">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ product.name }}</mat-card-title>
          <button mat-raised-button color="primary" [routerLink]="['/products', product.id, 'edit']">Editar</button>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Código:</strong> {{ product.code }}</p>
          <p><strong>Descrição:</strong> {{ product.description }}</p>
          <p><strong>Categoria:</strong> {{ product.category }}</p>
          <p><strong>Unidade:</strong> {{ product.unit }}</p>
          <p><strong>Estoque Atual:</strong> {{ product.currentStock }}</p>
          <p><strong>Estoque Mínimo:</strong> {{ product.minimumStock }}</p>
          <p><strong>Preço Unitário:</strong> R$ {{ product.unitPrice }}</p>
          <p><strong>Status:</strong> <span class="status-badge" [class]="product.status">{{ product.status === 'active' ? 'Ativo' : 'Inativo' }}</span></p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.apiService.getById<Product>('products', id).subscribe(p => this.product = p);
  }
}
