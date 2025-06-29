import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private toastr: ToastrService) {}

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
      console.log('Subiendo archivo:', this.selectedFile.name);
      // Aquí puedes agregar la lógica para subir el archivo al servidor o procesarlo
      this.toastr.info(`Archivo "${this.selectedFile.name}" subido correctamente.`);
      // Reset after upload
      this.selectedFile = null;
      this.selectedFileName = '';
      const input = document.getElementById('csvUpload') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  }
}
