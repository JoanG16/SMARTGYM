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
  selector: 'app-productos-form',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css'
})
export class ProductosFormComponent implements OnInit {

  producto: any = {};
  categorias: any[] = [];
  modoEdicion: boolean = false;

  constructor(
    private comprasService: ComprasService, 
    private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Obtener todas las categorías de productos
    this.comprasService.obtenerCategorias().subscribe((categorias: any[]) => {
      this.categorias = categorias;
    });

    // Verificar si se está editando un producto existente
    const idProducto = this.route.snapshot.params['id'];
    if (idProducto) {
      this.modoEdicion = true;
      // Obtener el producto por su id y cargar los datos para editar
      this.comprasService.obtenerProductoPorId(idProducto).subscribe((producto: any) => {
        this.producto = producto;
      });
    }
  }

  guardarProducto(): void {
    // Llamar al servicio para guardar el producto
    this.comprasService.guardarProducto(this.producto).subscribe((res: any) => {
      console.log('Producto guardado:', res);
      // Redirigir a la lista de productos u otra página según necesites
      this.router.navigate(['/productos']);
      this.toastr.success('Producto creado correctamente', 'Éxito');
    }, (error) => {
      console.error('Error al guardar el producto:', error);
      this.toastr.error('No se pudo crear el producto', 'Error');
      // Manejar el error según necesites
    });
  }
}
