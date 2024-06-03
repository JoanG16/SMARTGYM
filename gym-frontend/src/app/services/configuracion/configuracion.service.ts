import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  respaldarBaseDatos(nombreArchivo: string): Observable<any> {
    return this.http.post(`${this.URL}/respaldar`, nombreArchivo)
  }


  //AQUÍ SE MANDA EL ARCHIVO AL SERVIDOR PARA SUBIRLO
  restoreDatabase(formData:any): Observable<any> {
    return this.http.post(`${this.URL}/restore-database`, formData );
  }


}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ConfiguracionService {

//   private baseUrl = 'http://localhost:3000/api/configuracion'; // Cambia esto según tu configuración

//   constructor(private http: HttpClient) { }

//   respaldarBaseDatos(nombreArchivo: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/respaldar`, { nombreArchivo });
//   }

//   restoreDatabase(formData: FormData): Observable<any> {
//     return this.http.post(`${this.baseUrl}/restore-database`, formData);
//   }
// }
