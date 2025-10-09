import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>Nova Nota Fiscal</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width"><mat-label>Número</mat-label><input matInput formControlName="number"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Série</mat-label><input matInput formControlName="series"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Tipo</mat-label><mat-select formControlName="type"><mat-option value="incoming">Entrada</mat-option><mat-option value="outgoing">Saída</mat-option></mat-select></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Data</mat-label><input matInput [matDatepicker]="picker" formControlName="date"><mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle><mat-datepicker #picker></mat-datepicker></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Valor Total</mat-label><input matInput type="number" formControlName="totalValue"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Chave de Acesso</mat-label><input matInput formControlName="accessKey"></mat-form-field>
            <button mat-raised-button color="primary" type="submit">Salvar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class InvoiceFormComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    const user = this.authService.getCurrentUser();
    this.form = this.fb.group({ number: ['', Validators.required], series: [''], type: ['incoming', Validators.required], date: [new Date(), Validators.required], totalValue: [0], accessKey: [''], companyId: [user?.companyId || ''], status: ['pending'] });
  }
  onSubmit() {
    if (this.form.valid) {
      this.apiService.create('invoices', this.form.value).subscribe(() => this.router.navigate(['/invoices']));
    }
  }
}
