import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { Partner } from '../../../models/user.model';

@Component({
  selector: 'app-partner-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="container" *ngIf="partner">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ partner.name }}</mat-card-title>
          <button mat-raised-button color="primary" [routerLink]="['/partners', partner.id, 'edit']">Editar</button>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Tipo:</strong> {{ partner.type }}</p>
          <p><strong>CNPJ/CPF:</strong> {{ partner.cnpjCpf }}</p>
          <p><strong>Email:</strong> {{ partner.email }}</p>
          <p><strong>Telefone:</strong> {{ partner.phone }}</p>
          <p><strong>Endereço:</strong> {{ partner.address }}</p>
          <p><strong>Status:</strong> <span class="status-badge" [class]="partner.status">{{ partner.status === 'active' ? 'Ativo' : 'Inativo' }}</span></p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PartnerDetailComponent implements OnInit {
  partner?: Partner;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.apiService.getById<Partner>('partners', id).subscribe(p => this.partner = p);
  }
}
