import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private toastr: ToastrService, private http: HttpClient) {}

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
}
