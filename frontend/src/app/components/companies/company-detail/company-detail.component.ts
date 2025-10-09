import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { Company } from '../../../models/user.model';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="container" *ngIf="company">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ company.name }}</mat-card-title>
          <button mat-raised-button color="primary" [routerLink]="['/companies', company.id, 'edit']">Editar</button>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Nome Fantasia:</strong> {{ company.tradeName }}</p>
          <p><strong>CNPJ:</strong> {{ company.cnpj }}</p>
          <p><strong>Tipo:</strong> {{ company.type === 'headquarters' ? 'Matriz' : 'Filial' }}</p>
          <p><strong>Email:</strong> {{ company.email }}</p>
          <p><strong>Telefone:</strong> {{ company.phone }}</p>
          <p><strong>Status:</strong> <span class="status-badge" [class]="company.status">{{ company.status === 'active' ? 'Ativo' : 'Inativo' }}</span></p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class CompanyDetailComponent implements OnInit {
  company?: Company;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.apiService.getById<Company>('companies', id).subscribe(c => this.company = c);
  }
}
