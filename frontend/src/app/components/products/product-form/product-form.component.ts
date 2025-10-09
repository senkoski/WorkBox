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
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEdit ? 'Editar' : 'Novo' }} Produto</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width"><mat-label>Código</mat-label><input matInput formControlName="code"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Nome</mat-label><input matInput formControlName="name"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Descrição</mat-label><textarea matInput formControlName="description"></textarea></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Categoria</mat-label><input matInput formControlName="category"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Unidade</mat-label><input matInput formControlName="unit"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Estoque Mínimo</mat-label><input matInput type="number" formControlName="minimumStock"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Preço Unitário</mat-label><input matInput type="number" formControlName="unitPrice"></mat-form-field>
            <button mat-raised-button color="primary" type="submit">Salvar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: string;
  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    const user = this.authService.getCurrentUser();
    this.form = this.fb.group({ code: ['', Validators.required], name: ['', Validators.required], description: [''], category: [''], unit: ['UN'], minimumStock: [0], unitPrice: [0], companyId: [user?.companyId || ''], status: ['active'] });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) { this.isEdit = true; this.apiService.getById('products', this.id).subscribe((p: any) => this.form.patchValue(p)); }
  }
  onSubmit() {
    if (this.form.valid) {
      const obs = this.isEdit ? this.apiService.update('products', this.id!, this.form.value) : this.apiService.create('products', this.form.value);
      obs.subscribe(() => this.router.navigate(['/products']));
    }
  }
}
