import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';


import { UsuariosService } from '../../../services/usuarios/usuarios.service';

import { IUsuario } from "../../../interfaces/usuario";
import { IRoles } from "../../../interfaces/roles";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {


  selectedUser: string = ''; // Variable para almacenar el usuario seleccionado
  selectedRoles: string = '';

  user: string='';

  usuarios: any[] = [];
  roles: any[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.roles = [];
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.getAllUsuarios();
    this.getAllRoles();
  }

  getAllUsuarios() {
    this.usuariosService.getUsuarios()
      .subscribe(
        res => {
          this.usuarios = Object.values(res);
          console.log(this.usuarios)
        },
        err => {
          console.log(err);
        }
      )
  }

  getAllRoles() {
    this.usuariosService.getRoles()
      .subscribe(
        res => {
          this.roles = Object.values(res);
          console.log(this.roles);
        },
        err => {
          console.log(err);
        }
      );
  }
  asignarROL() {
    const usuario: IUsuario = {
      user: this.selectedUser,
      roles: this.selectedRoles
    };

    console.log('Asignando rol:', usuario); // Log para depuración

    this.usuariosService.asignarRol(usuario).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
        this.toastr.success(res.message);
      },
      err => {
        console.error(err);
        this.toastr.error('Error al asignar el rol');
      }
    );
  }
  deleteUsuario(name: string) {
    this.usuariosService.deleteUsuario(name)
    .subscribe(
      res=> {
        this.ngOnInit();
        this.toastr.success('El usuario fue eliminado correctamente');
      },
      err => {
        console.log(err);
      }
    );
  }


  setSelectedUser(user: string) {
    this.selectedUser = user;
  }

}

