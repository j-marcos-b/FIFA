import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModeService } from '../../services/auth-mode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedFile: File | null = null;
  selectedFileName: string = '';
  showCsvUpload: boolean = true;
  isAuthenticated: boolean = false;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private authModeService: AuthModeService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hideCsvRoutes = ['/', '/login', '/register', '/welcome-page'];
      this.showCsvUpload = !hideCsvRoutes.includes(event.url);
      this.isAuthenticated = !!localStorage.getItem('token');
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/welcome-page']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.name.endsWith('.csv')) {
        this.selectedFile = file;
        this.selectedFileName = file.name;
      } else {
        this.toastr.error('Por favor, seleccione un archivo con extensión .csv');
        input.value = ''; // Reset the input
        this.selectedFile = null;
        this.selectedFileName = '';
      }
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('/api/csv/upload-csv', formData).subscribe({
        next: (response: any) => {
          this.toastr.success(response.msg || 'Archivo subido correctamente');
          this.resetFileInput();
        },
        error: (error: HttpErrorResponse) => {
          const msg = error.error?.msg || 'Error al subir el archivo';
          this.toastr.error(msg);
          this.resetFileInput();
        }
      });
    }
  }

  private resetFileInput(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    const input = document.getElementById('csvUpload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onRegisterClick(): void {
    this.authModeService.setMode('register');
    this.router.navigate(['/login']);
  }
}
