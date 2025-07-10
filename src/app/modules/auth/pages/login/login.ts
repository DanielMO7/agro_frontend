import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private cookieService: CookieService,private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading.set(true);
      this.errorMessage.set(null);

      const credentials = this.form.value;

      this.authService
        .login(credentials)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (response) => {
            const access_token = response.access_token;
            this.cookieService.set('access_token', access_token, 1, '/', '', true, 'Strict');
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            if (error.status === 401) {
              this.errorMessage.set(
                error.error?.error || 'Credenciales inválidas'
              );
            } else {
              this.errorMessage.set('Error inesperado. Intenta más tarde.');
            }
          },
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
