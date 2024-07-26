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

import { ComprasService } from '../../../services/compras/compras.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {

  compras: any[] = [];
  compraSeleccionada: any = null;
  detallesCompra: any[] = [];

  constructor(
    private comprasService: ComprasService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.comprasService.getCompras().subscribe(
      res => {
        this.compras = res;
        console.log('Compras:', this.compras);
      },
      err => {
        console.error('Error al cargar compras:', err);
      }
    );
  }

  verCompra(id: number): void {
    this.comprasService.getCompraById(id).subscribe(
      res => {
        if (res.length > 0) {
          this.compraSeleccionada = {
            idcompra: res[0].idcompra,
            descripcion: res[0].compra_descripcion,
            total: res[0].compra_total,
            fecha: res[0].compra_fecha
          };
          this.detallesCompra = res;
          // Abrir el modal
          const modalElement = document.getElementById('compraModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }
        }
      },
      err => {
        console.error('Error al obtener los detalles de la compra:', err);
      }
    );
  }

}
