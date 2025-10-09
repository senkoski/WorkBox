import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-partner-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEdit ? 'Editar' : 'Novo' }} Parceiro</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width"><mat-label>Nome</mat-label><input matInput formControlName="name"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Tipo</mat-label><mat-select formControlName="type"><mat-option value="supplier">Fornecedor</mat-option><mat-option value="customer">Cliente</mat-option><mat-option value="service_provider">Prestador</mat-option><mat-option value="carrier">Transportadora</mat-option></mat-select></mat-form-field>
            <mat-form-field class="full-width"><mat-label>CNPJ/CPF</mat-label><input matInput formControlName="cnpjCpf"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Email</mat-label><input matInput formControlName="email"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Telefone</mat-label><input matInput formControlName="phone"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Endereço</mat-label><input matInput formControlName="address"></mat-form-field>
            <button mat-raised-button color="primary" type="submit">Salvar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PartnerFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: string;
  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    const user = this.authService.getCurrentUser();
    this.form = this.fb.group({ name: ['', Validators.required], type: ['supplier', Validators.required], cnpjCpf: [''], email: [''], phone: [''], address: [''], companyId: [user?.companyId || ''], status: ['active'] });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) { this.isEdit = true; this.apiService.getById('partners', this.id).subscribe((p: any) => this.form.patchValue(p)); }
  }
  onSubmit() {
    if (this.form.valid) {
      const obs = this.isEdit ? this.apiService.update('partners', this.id!, this.form.value) : this.apiService.create('partners', this.form.value);
      obs.subscribe(() => this.router.navigate(['/partners']));
    }
  }
}
