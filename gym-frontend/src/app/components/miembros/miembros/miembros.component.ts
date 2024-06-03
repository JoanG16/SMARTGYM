import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';

import { MiembrosService } from '../../../services/miembros.service';

import { IMiembro } from "../../../interfaces/miembros";



@Component({
  selector: 'app-miembros',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.css'
})
export class MiembrosComponent implements OnInit {

  id: string='';

  miembros: any[] = [];

  miembro: IMiembro = {
    matricula: '',
    nombre: '',
    telefono: '',
    direccion: '',
    edad: 0,
    sufreEnfermedad: false,
    tieneSeguro: false,
    enfermedad: '',
    institucion: '',
    nombreContacto: '',
    telefonoContacto: '',
    imagen: '',
    estado: ''
  }

  constructor(
    private miembrosService: MiembrosService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ) {
    this.miembros = [];

  }

  ngOnInit(): void {
    this.getAllMiembros();
  }


  getAllMiembros() {
    this.miembrosService.getProducts()
      .subscribe(
        res => {
          this.miembros = Object.values(res);
          console.log(this.miembros)
        },
        err => {
          console.log(err);
        }
      )
  }

  deleteMiembro(id: string) {
    this.miembrosService.deleteMiembroId(id)
    .subscribe(
      res=> {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toLocaleDateString(); // Formatea la fecha como una cadena (por ejemplo, "25/04/2024")
  }

}
