import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink, Router, Params, ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


import { MiembrosService } from '../../../services/miembros.service';
import { IMiembro } from "../../../interfaces/miembros";


@Component({
  selector: 'app-credencialmiembro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './credencialmiembro.component.html',
  styleUrl: './credencialmiembro.component.css'
})
export class CredencialmiembroComponent implements OnInit {

  id: number=0;

  miembros: any[] = [];

  miembro: IMiembro={
    idmiembro:0,
    matricula:'',
    nombre:'',
    telefono:'',
    direccion:'',
    edad:0,
    sufreEnfermedad: false,
    tieneSeguro:false,
    enfermedad:'',
    institucion:'',
    nombreContacto:'',
    telefonoContacto:'',
    imagen:'',
    estado:''
  }

  constructor(
    private miembrosService: MiembrosService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ){ 
    this.miembros = [];

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['idmiembro'];
      if (id) {
        this.getMiembroById(id);
      }
    });
  }

  //metodo para consultar solo un miembro por id
  getMiembroById(id: number): void {
    this.miembrosService.getMiembroId(id).subscribe(
      miembro => {
        this.miembro = miembro;
        console.log(this.miembro)
      },
      error => {
        console.error(error);
      }
    );
  }


  //PARTE PARA TRANSFORMAR A PDF
  titulo = "credencial-miembro";

  public convertirPDF() {

    const DATA: any = document.getElementById('credencial');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
      width: 750, // Convertir las dimensiones a píxeles (7.5 cm * 100 píxeles/cm)
      height: 1000, // (10 cm * 100 píxeles/cm)
      windowWidth: 750, // Tamaño del lienzo en píxeles
      windowHeight: 1000, // (altura * escala)
      x: 0, // Posición inicial del lienzo
      y: 0,
      logging: true, letterRendering: true, useCORS: true
    };

    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save('credencial-miembro');
      })
  }



}
