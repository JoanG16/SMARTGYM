import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Router } from '@angular/router';

import { IUsuario } from "../../interfaces/usuario";
import { IRoles } from "../../interfaces/roles";

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private URL = 'http://localhost:3000/api'

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }


  createUsuario(usuario: IUsuario): Observable<IUsuario>{
    return this.http.post<IUsuario>(this.URL + '/usuarios', usuario);
  }

  getUsuarios(): Observable<any[]>{
    return this.http.get<any[]>(this.URL + '/usuarios');
  }

  getUsuarioId(user: string): Observable<IUsuario>{
    return this.http.get<IUsuario>(this.URL + `/usuarios/${user}`);
  }

  deleteUsuario(user: string): Observable<IUsuario>{
    return this.http.delete<IUsuario>(this.URL + `/usuarios/${user}`);
  }

  updateUsuario(user: string, usuario: IUsuario): Observable<IUsuario>{
    return this.http.patch<IUsuario>(this.URL + `/usuarios/${user}`, usuario);
  }


  //rolessss

  
  createRol(rol: IRoles): Observable<IRoles>{
    return this.http.post<IRoles>(this.URL + '/usuarios/roles', rol);
  }

  getRoles(): Observable<IRoles[]>{
    console.log("Llamando a getRoles()");
    return this.http.get<IRoles[]>(this.URL + '/roles');
  }
  // getUsuarios(): Observable<any[]>{
  //   return this.http.get<any[]>(this.URL + '/usuarios');
  // }
  asignarRol(usuario: IUsuario): Observable<IUsuario>{
    return this.http.post<IUsuario>(this.URL + `/asignar_rol`, usuario);
  }

  deleteRol(name: string): Observable<IRoles>{
    return this.http.delete<IRoles>(this.URL + `/eliminar_rol/${name}`);
  }
  // asignarRol(usuario: IUsuario): Observable<any> {
  //   return this.http.post(`${this.URL}/asignar-rol`, usuario);
  // }
}




