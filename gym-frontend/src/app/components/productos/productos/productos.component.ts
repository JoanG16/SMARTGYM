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
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productosConStockYCategorias: any[] = [];

  constructor(
    private comprasService: ComprasService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerProductosConStockYCategorias();
  }

  obtenerProductosConStockYCategorias(): void {
    this.comprasService.getProductosConStockYCategorias().subscribe(
      (productos) => {
        this.productosConStockYCategorias = productos;
        console.log('Productos:', this.productosConStockYCategorias);
      },
      (error) => {
        console.error('Error al obtener los productos con stock y categoría:', error);
        // Puedes manejar el error según tus necesidades (mostrar mensaje, etc.)
      }
    );
  }

  eliminarProducto(id: number): void {
    this.comprasService.eliminarProducto(id).subscribe(
        () => {
            this.obtenerProductosConStockYCategorias(); // Actualiza la lista de productos después de eliminar
            this.toastr.success('Producto eliminado correctamente', 'Éxito');
        },
        (error) => {
            console.error('Error al eliminar el producto:', error);
            this.toastr.error('No se pudo eliminar el producto', 'Error');
        }
    );
  }





}
