import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>Meu Perfil</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width"><mat-label>Nome</mat-label><input matInput formControlName="fullName"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Email</mat-label><input matInput formControlName="email"></mat-form-field>
            <mat-form-field class="full-width"><mat-label>Telefone</mat-label><input matInput formControlName="phone"></mat-form-field>
            <button mat-raised-button color="primary" type="submit">Salvar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({ fullName: ['', Validators.required], email: ['', [Validators.required, Validators.email]], phone: [''] });
  }
  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) this.profileForm.patchValue(user);
  }
  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe(() => alert('Perfil atualizado!'));
    }
  }
}
