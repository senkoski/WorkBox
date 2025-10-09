import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEdit ? 'Editar' : 'Novo' }} Patrimônio</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width"><mat-label>Código</mat-label><input matInput formControlName="code"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Nome</mat-label><input matInput formControlName="name"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Descrição</mat-label><textarea matInput formControlName="description"></textarea></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Categoria</mat-label><input matInput formControlName="category"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Valor de Aquisição</mat-label><input matInput type="number" formControlName="acquisitionValue"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Status</mat-label><mat-select formControlName="status"><mat-option value="available">Disponível</mat-option><mat-option value="in_use">Em Uso</mat-option><mat-option value="maintenance">Manutenção</mat-option><mat-option value="retired">Baixado</mat-option></mat-select></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Localização</mat-label><input matInput formControlName="location"></mat-form-field>
            <button mat-raised-button color="primary" type="submit">Salvar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AssetFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: string;
  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    const user = this.authService.getCurrentUser();
    this.form = this.fb.group({ code: ['', Validators.required], name: ['', Validators.required], description: [''], category: [''], acquisitionValue: [0], status: ['available'], location: [''], companyId: [user?.companyId || ''] });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) { this.isEdit = true; this.apiService.getById('assets', this.id).subscribe((a: any) => this.form.patchValue(a)); }
  }
  onSubmit() {
    if (this.form.valid) {
      const obs = this.isEdit ? this.apiService.update('assets', this.id!, this.form.value) : this.apiService.create('assets', this.form.value);
      obs.subscribe(() => this.router.navigate(['/assets']));
    }
  }
}
