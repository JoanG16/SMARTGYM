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

import { IRoles } from "../../../interfaces/roles";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  formRoles!: FormGroup;
  name: string;
  roles: any[] = [];


  rol: IRoles = {
    name: '',
    
  }
  nuevoRol: IRoles = {};

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.roles = [];
    this.formRoles = this.fb.group({
      name: new FormControl('', [Validators.required]),
      
    });
    this.name = String(aRouter.snapshot.paramMap.get('name'));
  }

  ngOnInit(): void {
    this.getAllRoles();
  }


  getAllRoles() {
    this.usuariosService.getRoles()
      .subscribe(
        res => {
          this.roles = Object.values(res);;
          console.log(this.roles)
        },
        err => {
          console.log(err);
        }
      )
  }

  

  submitRol() {
    const rol: IRoles = {
      name: this.formRoles.value.name,
      
    }
    this.usuariosService.createRol(rol)
      .subscribe(
        res => {
          console.log(res);
          this.clearCheckboxes();
          this.resetForm();
          this.ngOnInit();
          this.toastr.success(res.message);
        },
        err => console.log(err)
      );
  }

  deleteRol(name: string) {
    this.usuariosService.deleteRol(name)
      .subscribe(
        res => {
          this.ngOnInit();
          this.toastr.success(`El rol ${name} fue eliminado correctamente`);
        },
        err => {
          console.log(err);
        }
      );
  }
  
  


  resetForm() {
    this.formRoles.reset(); // Restablece el formulario a su estado inicial
  }
  
  clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false; // Desmarca cada checkbox
    });
  }
  





  //codigo para los checks
  onChangeCheckbox(event: any) {
    const checkboxValue = event.target.value; // Valor del checkbox seleccionado
    let privilegios = this.formRoles.value.privilegios; // Obtener los privilegios actuales
  
    if (event.target.checked) { // Si el checkbox fue marcado
      // Verificar si el valor del checkbox ya está incluido en los privilegios
      if (!privilegios.includes(checkboxValue)) { 
        // Concatenar el valor del checkbox a los privilegios actuales
        privilegios += (privilegios ? ', ' : '') + checkboxValue;
      }
    } else { // Si el checkbox fue desmarcado
      // Remover el valor del checkbox de los privilegios actuales
      privilegios = privilegios.split(', ').filter((p: string) => p !== checkboxValue).join(', ');
    }
  
    // Actualizar el valor del campo 'privilegios' en el formulario
    this.formRoles.patchValue({
      privilegios: privilegios
    });
  }
  



}
