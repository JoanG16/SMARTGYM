import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { RouterOutlet, RouterLink, Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { UsuariosService } from '../../../services/usuarios/usuarios.service';

import { IUsuario } from "../../../interfaces/usuario";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css'
})
export class UsuariosFormComponent implements OnInit {

  formUsuarios!: FormGroup;
  name:string;
  operacion: string = 'Registrar ';
  operacionBoton: string = 'Registrar ';
  operacionToastr: string = 'creado';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.formUsuarios = this.fb.group({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.name = String(aRouter.snapshot.paramMap.get('name'));
  }

  ngOnInit(): void {
    if (this.name != 'null') {
      // Es editar
      this.operacion = 'Editar ';
      this.operacionBoton = 'Guardar';
      this.operacionToastr = 'moficado';
      this.getUsuario(this.name);
    }
   }

   getUsuario(name: string) {
    this.usuariosService.getUsuarioId(name).subscribe((data: IUsuario) => {
      this.formUsuarios.setValue({
        name: data.name,
        password: data.password
      })
    })
    console.log('entró a getUsuario: ', name)
  }

  submitUsuario() {
    const usuario: IUsuario = {
      name: this.formUsuarios.value.name,
      password: this.formUsuarios.value.password
    }
    
    if (this.name !== 'null') {
      this.usuariosService.updateUsuario(this.name, usuario)
        .subscribe(
          res => {
            console.log(res),
              this.router.navigate(['/usuarios']);
              this.toastr.success(`El usuario fue ${this.operacionToastr} correctamente`);
          },
          err => console.log(err)
        )
    }
    else {
    this.usuariosService.createUsuario(usuario)
      .subscribe(
        res => {
          console.log(res),
            this.router.navigate(['/usuarios']);
            this.toastr.success(`El usuario fue ${this.operacionToastr} correctamente`);
        },
        err => console.log(err)
      );
    }
  }

}
