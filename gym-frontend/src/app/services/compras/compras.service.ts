import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private URL = 'http://localhost:3000/api'
  private pollingInterval = 2000; // Intervalo de polling en milisegundos (ejemplo: cada 5 segundos)


  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  // Obtener todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/allproductos`);
  }

  // Obtener stock de un producto por su ID
  getStock(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/stock/${id}`);
  }

  // Obtener todas las compras
  getCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/compras`);
  }

  // Obtener detalles de una compra por su ID
  getDetalleCompra(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/compras/${id}/detalles`);
  }

  // Obtener todas las transacciones
  getTransacciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/transacciones`);
  }

  // Obtener el estado de la caja
  getCaja(): Observable<any> {
    return this.http.get<any>(`${this.URL}/caja`);
  }

  getCajaActualizada(): Observable<any> {
    return interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => this.http.get<any>(`${this.URL}/caja`))
    );
  }

  // Crear una nueva compra
  realizarCompra(compra: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/compras`, compra);
  }

  getCompraById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/compras/${id}`);
  }

  // Obtener todos los productos con su stock y categoría
  getProductosConStockYCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/productos`);
  }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/categorias`);
  }

  // Guardar un producto (crear o actualizar)
  guardarProducto(producto: any) {
    if (producto.idproducto) {
      // Si tiene idproducto, es una actualización
      return this.http.post(`${this.URL}/productos/guardar`, producto);
    } else {
      // Si no tiene idproducto, es una creación
      return this.http.post(`${this.URL}/productos/guardar`, producto);
    }
  }

  // Obtener un producto por su id
  obtenerProductoPorId(id: number) {
    return this.http.get(`${this.URL}/productos/${id}`);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}/productos/${id}`);
  } 

}
