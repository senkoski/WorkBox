import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { Invoice } from '../../../models/user.model';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="container" *ngIf="invoice">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Nota Fiscal {{ invoice.number }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Número:</strong> {{ invoice.number }}</p>
          <p><strong>Série:</strong> {{ invoice.series }}</p>
          <p><strong>Tipo:</strong> {{ invoice.type === 'incoming' ? 'Entrada' : 'Saída' }}</p>
          <p><strong>Data:</strong> {{ invoice.date | date:'dd/MM/yyyy' }}</p>
          <p><strong>Valor Total:</strong> R$ {{ invoice.totalValue }}</p>
          <p><strong>Chave de Acesso:</strong> {{ invoice.accessKey }}</p>
          <p><strong>Status:</strong> <span class="status-badge" [class]="invoice.status">{{ invoice.status }}</span></p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class InvoiceDetailComponent implements OnInit {
  invoice?: Invoice;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.apiService.getById<Invoice>('invoices', id).subscribe(i => this.invoice = i);
  }
}
