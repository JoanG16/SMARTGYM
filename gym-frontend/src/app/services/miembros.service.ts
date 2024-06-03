import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Router } from '@angular/router';

import { IMiembro } from "../../app/interfaces/miembros";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiembrosService {

  private URL = 'http://localhost:3000/api'

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  createMiembro(miembro: IMiembro): Observable<IMiembro>{
    return this.http.post<IMiembro>(this.URL + '/miembros', miembro);
  }

  getProducts(): Observable<IMiembro[]>{
    return this.http.get<IMiembro[]>(this.URL + '/miembros');
  }

  getMiembroId(id: number): Observable<IMiembro>{
    return this.http.get<IMiembro>(this.URL + `/miembros/${id}`);
  }

  deleteMiembroId(id: string): Observable<IMiembro>{
    return this.http.delete<IMiembro>(this.URL + `/miembros/${id}`);
  }

  updateMiembro(id: number, miembro: IMiembro): Observable<IMiembro>{
    return this.http.patch<IMiembro>(this.URL + `/miembros/${id}`, miembro);
  }

}
