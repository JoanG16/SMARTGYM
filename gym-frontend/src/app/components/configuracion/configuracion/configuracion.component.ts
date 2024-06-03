import { Component } from '@angular/core';
import { ConfiguracionService } from '../../../services/configuracion/configuracion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  uploadedFiles: File[] = [];
  editarActivo = false;
  imagenURL: string | ArrayBuffer | null = null;
  originalFileName = '';
  serverFileName = '';

  constructor(
    private configuracionService: ConfiguracionService,
    private toastr: ToastrService
  ) { }

  respaldar(): void {
    const fechaHoraActual = new Date().toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
    const nombreArchivo = `gym-respaldo_${fechaHoraActual}.bak`;
    this.configuracionService.respaldarBaseDatos(nombreArchivo).subscribe(
      (res) => {
        console.log('Respuesta del servidor:', res);
        this.toastr.success(res.message);
      },
      (error) => {
        console.error('Error en el respaldo:', error);
        this.toastr.error('Error al respaldar la base de datos');
      }
    );
  }

  Restaurar(): void {
    const formData = new FormData();
    this.uploadedFiles.forEach(file => {
      formData.append('uploads[]', file, file.name);
    });
    this.configuracionService.restoreDatabase(formData).subscribe(
      (res) => {
        console.log('Respuesta del servidor:', res);
        this.originalFileName = res.originalFileName;
        this.serverFileName = res.serverFileName;
        this.toastr.success(res.message);
      },
      (error) => {
        console.error('Error al restaurar la base de datos:', error);
        this.toastr.error('Error al restaurar la base de datos');
      }
    );
  }

  fileChange(event: any): void {
    this.uploadedFiles = Array.from(event.target.files);
    if (this.uploadedFiles.length > 0) {
      this.originalFileName = this.uploadedFiles[0].name;
    }
  }

  activarEdicion(): void {
    this.editarActivo = true;
    this.habilitarCampos();
  }

  guardarCambios(): void {
    this.editarActivo = false;
    this.deshabilitarCampos();
    // Aquí puedes agregar la lógica para guardar los cambios en tu sistema
  }

  private habilitarCampos(): void {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      (input as HTMLInputElement).removeAttribute('disabled');
    });
  }

  private deshabilitarCampos(): void {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      (input as HTMLInputElement).setAttribute('disabled', 'true');
    });
  }

  handleFileInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
