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

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEdit ? 'Editar' : 'Nova' }} Empresa</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width"><mat-label>Nome</mat-label><input matInput formControlName="name"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Nome Fantasia</mat-label><input matInput formControlName="tradeName"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>CNPJ</mat-label><input matInput formControlName="cnpj"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Tipo</mat-label><mat-select formControlName="type"><mat-option value="headquarters">Matriz</mat-option><mat-option value="branch">Filial</mat-option></mat-select></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Email</mat-label><input matInput formControlName="email"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Telefone</mat-label><input matInput formControlName="phone"></mat-form-field>
            <button mat-raised-button color="primary" type="submit">Salvar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class CompanyFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: string;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({ name: ['', Validators.required], tradeName: [''], cnpj: [''], type: ['headquarters'], email: [''], phone: [''], status: ['active'] });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) { this.isEdit = true; this.apiService.getById('companies', this.id).subscribe((c: any) => this.form.patchValue(c)); }
  }
  onSubmit() {
    if (this.form.valid) {
      const obs = this.isEdit ? this.apiService.update('companies', this.id!, this.form.value) : this.apiService.create('companies', this.form.value);
      obs.subscribe(() => this.router.navigate(['/companies']));
    }
  }
}
