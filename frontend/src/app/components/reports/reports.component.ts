import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  template: `
    <div class="container">
      <h1>Relatórios</h1>
      <div class="report-grid">
        <mat-card class="report-card">
          <mat-card-header><mat-card-title>Relatório de Patrimônio</mat-card-title></mat-card-header>
          <mat-card-content>
            <p>Visualize todos os ativos patrimoniais cadastrados</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="generateAssetReport()">Gerar</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="report-card">
          <mat-card-header><mat-card-title>Relatório de Estoque</mat-card-title></mat-card-header>
          <mat-card-content>
            <p>Visualize o status atual do estoque</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="generateStockReport()">Gerar</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="report-card">
          <mat-card-header><mat-card-title>Relatório Fiscal</mat-card-title></mat-card-header>
          <mat-card-content>
            <p>Visualize todas as notas fiscais</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="generateInvoiceReport()">Gerar</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .report-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
    .report-card { height: 100%; }
  `]
})
export class ReportsComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {}
  generateAssetReport() { this.apiService.get('reports/assets').subscribe(data => { console.log('Asset Report:', data); alert('Relatório gerado! Verifique o console.'); }); }
  generateStockReport() { this.apiService.get('reports/stock').subscribe(data => { console.log('Stock Report:', data); alert('Relatório gerado! Verifique o console.'); }); }
  generateInvoiceReport() { this.apiService.get('reports/invoices').subscribe(data => { console.log('Invoice Report:', data); alert('Relatório gerado! Verifique o console.'); }); }
}
