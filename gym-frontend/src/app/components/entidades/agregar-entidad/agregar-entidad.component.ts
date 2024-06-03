import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, ActivatedRoute, RouterModule } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';

import { EntidadesService } from '../../../services/entidades/entidades.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-entidad',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-entidad.component.html',
  styleUrls: ['./agregar-entidad.component.css']
})
export class AgregarEntidadComponent {

  // Uncomment and use this if you decide to use reactive forms
  // entidadForm: FormGroup;

  constructor(
    private entidadesService: EntidadesService,
    private router: Router,
    private toastr: ToastrService,
    // private fb: FormBuilder // Uncomment if using FormBuilder
  ) {
    // Uncomment and use this if you decide to use reactive forms
    // this.entidadForm = this.fb.group({
    //   nombreEntidad: ['', Validators.required],
    //   atributos: this.fb.array([this.createAtributo()])
    // });
  }

  nombreEntidad: string = '';
  atributos: any[] = [{ nombre: '', tipo: 'string', primaryKey: false }];

  agregarAtributo() {
    this.atributos.push({ nombre: '', tipo: 'string', primaryKey: false });
  }

  eliminarAtributo(index: number) {
    this.atributos.splice(index, 1);
  }

  guardarEntidad() {
    const entidad = {
      nombre: this.nombreEntidad,
      atributos: this.atributos.map(atributo => ({
        nombre: atributo.nombre,
        tipo: atributo.tipo,
        primaryKey: atributo.primaryKey ? 'YES' : 'NO'
      }))
    };

    this.entidadesService.crearEntidad(entidad).subscribe(
      response => {
        console.log('Entidad creada exitosamente:', response);
        this.router.navigate(['/entidades']);
        this.toastr.success(`Entidad ${this.nombreEntidad} creada exitosamente`);
      },
      error => {
        console.error('Error al crear la entidad:', error);
        this.toastr.error('Error al crear la entidad');
      }
    );
  }
}
