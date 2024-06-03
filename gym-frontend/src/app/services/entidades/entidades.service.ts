import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  private URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getEntidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/entidades`);
  }

  getAtributosEntidad(table_name: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/entidades/${table_name}`);
  }

  crearEntidad(entidad: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregar_entidad`, entidad);
  }

  generarProcedimientosSQL(): Observable<Blob> {
    return this.http.get(`${this.URL}/generar-procedimientos-todas`, { responseType: 'blob' });
  }
  
getRegistrosEntidad(entidad: string): Observable<any> {
  return this.http.get<any[]>(`${this.URL}/registros_entidad/${entidad}`);
}


}

