import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModeService } from '../../services/auth-mode.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  email: string = '';
  password: string = '';
  private modeSubscription: Subscription | undefined;
  apiUrl = 'http://localhost:3000/api/auth'; // Ajustar según backend

  constructor(
    private authModeService: AuthModeService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.modeSubscription = this.authModeService.mode$.subscribe(mode => {
      this.isLoginMode = (mode === 'login');
    });
  }

  ngOnDestroy(): void {
    this.modeSubscription?.unsubscribe();
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.toastr.error('Por favor complete todos los campos', 'Error');
      return;
    }

    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  login(): void {
    this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.toastr.success('Login exitoso', 'Éxito');
          this.router.navigate(['/players']);
        },
        error: (err) => {
          this.toastr.error('Login fallido', 'Error');
        }
      });
  }

  register(): void {
    this.http.post(`${this.apiUrl}/register`, { email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.toastr.success('Registro exitoso, ahora puede iniciar sesión', 'Éxito');
          this.isLoginMode = true;
        },
        error: () => {
          this.toastr.error('Registro fallido', 'Error');
        }
      });
  }
}
