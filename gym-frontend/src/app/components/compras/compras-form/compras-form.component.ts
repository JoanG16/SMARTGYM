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

@Component({
  selector: 'app-compras-form',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './compras-form.component.html',
  styleUrl: './compras-form.component.css'
})
export class ComprasFormComponent implements OnInit {

  productos: any[] = [];
  compras: any[] = [];
  transacciones: any[] = [];
  caja: any;
  stock: any;

  selectedProducto: any;
  cantidad: number = 1;
  costoUnitario: number = 0;
  detalles: any[] = [];
  total: number = 0;
  descripcion: string = '';

  constructor(
    private comprasService: ComprasService, 
    private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCompras();
    this.cargarTransacciones();
    this.cargarCaja();
  }
  

  cargarProductos(): void {
    this.comprasService.getProductos().subscribe(
      res => {
        this.productos = res;
        console.log('Productos:', this.productos);
      },
      err => {
        console.error('Error al cargar productos:', err);
      }
    );
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

  cargarTransacciones(): void {
    this.comprasService.getTransacciones().subscribe(
      res => {
        this.transacciones = res;
        console.log('Transacciones:', this.transacciones);
      },
      err => {
        console.error('Error al cargar transacciones:', err);
      }
    );
  }

  cargarCaja(): void {
    this.comprasService.getCaja().subscribe(
      res => {
        this.caja = res;
        console.log('Caja:', this.caja);
      },
      err => {
        console.error('Error al cargar caja:', err);
      }
    );
  }

  cargarStock(id: number): void {
    this.comprasService.getStock(id).subscribe(
      res => {
        this.stock = res;
        console.log('Stock del producto:', this.stock);
      },
      err => {
        console.error('Error al cargar stock:', err);
      }
    );
  }

  onProductoChange(): void {
    if (this.selectedProducto) {
      this.costoUnitario = this.selectedProducto.costo;
    } else {
      this.costoUnitario = 0;
    }
  }

  agregarProducto(): void {
    if (this.selectedProducto && this.cantidad > 0) {
      const subtotal = this.cantidad * this.selectedProducto.costo;
      this.detalles.push({
        idproducto: this.selectedProducto.idproducto,
        nombre: this.selectedProducto.nombre,
        cantidad: this.cantidad,
        costo_unitario: this.selectedProducto.costo,
        subtotal: subtotal
      });
      this.total += subtotal;
      this.selectedProducto = null;
      this.cantidad = 1;
      this.costoUnitario = 0;
    }
  }

  quitarProducto(index: number): void {
    this.total -= this.detalles[index].subtotal;
    this.detalles.splice(index, 1);
  }

  realizarCompra(): void {
    const nuevaCompra = {
      descripcion: this.descripcion,
      total: this.total,
      detalles: this.detalles.map(detalle => ({
        idproducto: detalle.idproducto,
        cantidad: detalle.cantidad,
        costo_unitario: detalle.costo_unitario,
        subtotal: detalle.subtotal
      }))
    };

    this.comprasService.realizarCompra(nuevaCompra).subscribe(
      res => {
        console.log('Compra realizada:', res);
        this.cargarCompras();
        this.cargarCaja();
        this.cargarTransacciones();
        this.detalles = [];
        this.total = 0;
        this.descripcion = ''; // Reiniciar descripción después de realizar la compra
        this.router.navigate(['/compras']);
        this.toastr.success('Compra realizada correctamente', 'Éxito');
      },
      err => {
        console.error('Error al realizar la compra:', err);
        this.toastr.error('No se pudo realizar la compra', 'Error');
      }
    );
  }

}
