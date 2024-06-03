import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { RouterOutlet, RouterLink, Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';

import { EntidadesService } from '../../../services/entidades/entidades.service';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

PdfMakeWrapper.setFonts(pdfFonts);

const pdf = new PdfMakeWrapper();

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.css'
})
export class EntidadesComponent implements OnInit {

  entidades: any[] = [];
  atributosEntidades: any[] = [];
  registrosEntidad: any[] = [];
  table_name: string;
  selectedEntidad: string = '';

  constructor(
    private fb: FormBuilder,
    private entidadesService: EntidadesService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.entidades = [];
    this.atributosEntidades = [];
    this.registrosEntidad = [];
    this.table_name = String(aRouter.snapshot.paramMap.get('table_name'));
  }

  ngOnInit(): void {
    this.getAllEntidades();
  }

  getAllEntidades() {
    this.entidadesService.getEntidades()
      .subscribe(
        res => {
          this.entidades = res;
          console.log(this.entidades)
        },
        err => {
          console.log(err);
        }
      )
  }
  getAtributosEntidad() {
    this.entidadesService.getAtributosEntidad(this.selectedEntidad)
      .subscribe(
        res => {
          this.atributosEntidades = res;
          console.log(this.atributosEntidades)
        },
        err => {
          console.log(err);
        }
      )
  }
  getAllRegistrosEntidad() {
    this.entidadesService.getRegistrosEntidad(this.selectedEntidad)
    .subscribe(
      res => {
        this.registrosEntidad = res;
        console.log(this.registrosEntidad)
      },
      err => {
        console.log(err);
      }
    )
  }
  generarPDF() {
    const pdf = new PdfMakeWrapper();

    const nombreArchivo = `entidad-${this.selectedEntidad}.pdf`;

    pdf.pageOrientation('landscape'); // Configura la orientación de la página a horizontal


    pdf.add(
      new Txt(`Registros de la entidad: ${this.selectedEntidad}`).bold().italics().end
    );

    if (this.registrosEntidad.length > 0) {
      const headerStyle = {
        fillColor: '#f3f3f3',
        bold: true
      };

      // Obtener las claves del primer registro para usarlas como cabeceras
      const headers = Object.keys(this.registrosEntidad[0]).map(key => ({
        text: key,
        style: [headerStyle, 'header']
      }));

      const body = [
        headers,
        ...this.registrosEntidad.map(record => 
          Object.values(record).map(value => ({
            text: value,
            style: 'normal'
          }))
        )
      ];

      pdf['styles']({
        header: { fontSize: 8 },
        normal: { fontSize: 7 }
      });

      pdf.add(
        new Table(body).headerRows(1).end
      );
    } else {
      pdf.add(new Txt('No hay registros disponibles para esta entidad.').end);
    }

    pdf.create().download(nombreArchivo);
  }


  generarScriptsSQL() {
    this.entidadesService.generarProcedimientosSQL()
      .subscribe(
        data => {
          const blob = new Blob([data], { type: 'application/sql' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'procedimientos.sql';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.toastr.success('Script generado correctamente');
        },
        error => {
          console.error('Error al generar los procedimientos almacenados:', error);
          // Manejar el error
        }
      );
  }
  
  

}
