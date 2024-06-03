import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { RouterOutlet, RouterLink, Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { MiembrosService } from '../../../services/miembros.service';

import { IMiembro } from "../../../interfaces/miembros";

@Component({
  selector: 'app-miembros-form',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './miembros-form.component.html',
  styleUrl: './miembros-form.component.css'
})
export class MiembrosFormComponent implements OnInit {

  formMiembros!: FormGroup;
  id: number;
  operacion: string = 'Registrar ';
  operacionBoton: string = 'Registrar ';

  constructor(
    private fb: FormBuilder,
    private miembrosService: MiembrosService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.formMiembros = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      matricula: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      sufreEnfermedad: new FormControl(false, [Validators.required]),
      tieneSeguro: new FormControl(false, [Validators.required]),
      enfermedad: new FormControl('', [Validators.required]),
      institucion: new FormControl('', [Validators.required]),
      nombreContacto: new FormControl('', [Validators.required]),
      telefonoContacto: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
    });
    this.id = Number(aRouter.snapshot.paramMap.get('idmiembro'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.operacionBoton = 'Guardar';
      this.getMiembro(this.id);
    }
  }


  getMiembro(id: number) {
    this.miembrosService.getMiembroId(id).subscribe((data: IMiembro) => {
      this.formMiembros.setValue({
        matricula: data.matricula,
        nombre: data.nombre,
        telefono: data.telefono,
        direccion: data.direccion,
        edad: data.edad,
        sufreEnfermedad: data.sufreEnfermedad,
        tieneSeguro: data.tieneSeguro,
        enfermedad: data.enfermedad,
        institucion: data.institucion,
        nombreContacto: data.nombreContacto,
        telefonoContacto: data.telefonoContacto,
        imagen: data.imagen
      })
    })
    console.log('entró a getMiembro: ', this.id)
  }

  submitMiembro() {
    const miembro: IMiembro = {
      matricula: this.formMiembros.value.matricula,
      nombre: this.formMiembros.value.nombre,
      telefono: this.formMiembros.value.telefono,
      direccion: this.formMiembros.value.direccion,
      edad: this.formMiembros.value.edad,
      sufreEnfermedad: this.formMiembros.value.sufreEnfermedad,
      tieneSeguro: this.formMiembros.value.tieneSeguro,
      enfermedad: this.formMiembros.value.enfermedad,
      institucion: this.formMiembros.value.institucion,
      nombreContacto: this.formMiembros.value.nombreContacto,
      telefonoContacto: this.formMiembros.value.telefonoContacto,
      imagen: this.formMiembros.value.imagen
    }
    if (this.id !== 0) {
      miembro.idmiembro = this.id
      this.miembrosService.updateMiembro(this.id, miembro)
        .subscribe(
          res => {
            console.log(res),
              this.router.navigate(['/miembros']);
          },
          err => console.log(err)
        )
    }
    else {
      this.miembrosService.createMiembro(miembro)
        .subscribe(
          res => {
            console.log(res),
              this.router.navigate(['/miembros']);
          },
          err => console.log(err)
        );
    }
  }
}
