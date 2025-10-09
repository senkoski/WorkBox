import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule],
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      <mat-grid-list cols="4" rowHeight="150px" gutterSize="20">
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-icon color="primary">inventory_2</mat-icon>
            <h3>{{ kpis.totalAssets || 0 }}</h3>
            <p>Patrimônios</p>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-icon color="accent">inventory</mat-icon>
            <h3>{{ kpis.totalProducts || 0 }}</h3>
            <p>Produtos</p>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-icon color="warn">warning</mat-icon>
            <h3>{{ kpis.lowStockProducts || 0 }}</h3>
            <p>Estoque Baixo</p>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-icon>receipt</mat-icon>
            <h3>{{ kpis.pendingInvoices || 0 }}</h3>
            <p>NFs Pendentes</p>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .dashboard-card { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; }
    .dashboard-card mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .dashboard-card h3 { font-size: 32px; margin: 16px 0 8px 0; }
    .dashboard-card p { margin: 0; color: #666; }
  `]
})
export class DashboardComponent implements OnInit {
  kpis: any = {};
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.get('reports/dashboard').subscribe(data => this.kpis = data.kpis || {});
  }
}
