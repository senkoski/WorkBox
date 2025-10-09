import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { Asset } from '../../../models/user.model';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="container" *ngIf="asset">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ asset.name }}</mat-card-title>
          <button mat-raised-button color="primary" [routerLink]="['/assets', asset.id, 'edit']">Editar</button>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Código:</strong> {{ asset.code }}</p>
          <p><strong>Descrição:</strong> {{ asset.description }}</p>
          <p><strong>Categoria:</strong> {{ asset.category }}</p>
          <p><strong>Valor de Aquisição:</strong> R$ {{ asset.acquisitionValue }}</p>
          <p><strong>Valor Atual:</strong> R$ {{ asset.currentValue }}</p>
          <p><strong>Status:</strong> <span class="status-badge" [class]="asset.status">{{ asset.status }}</span></p>
          <p><strong>Localização:</strong> {{ asset.location }}</p>
          <div *ngIf="asset.qrCode"><img [src]="asset.qrCode" alt="QR Code" style="max-width: 200px;"></div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AssetDetailComponent implements OnInit {
  asset?: Asset;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.apiService.getById<Asset>('assets', id).subscribe(a => this.asset = a);
  }
}
