import { Routes } from '@angular/router';

import { LoginComponent } from './components/usuarios/login/login.component';

import { MiembrosComponent } from './components/miembros/miembros/miembros.component';
import { MiembrosFormComponent } from './components/miembros/miembros-form/miembros-form.component';
import { CredencialmiembroComponent} from './components/miembros/credencialmiembro/credencialmiembro.component';

import { MembresiasComponent } from './components/membresias/membresias/membresias.component';
import { MembresiasFormComponent } from './components/membresias/membresias-form/membresias-form.component';

import { VisitasComponent } from './components/visitas/visitas/visitas.component';
import { RegistrarVisitasComponent } from './components/visitas/registrar-visitas/registrar-visitas.component';
import { RealizarpagoComponent } from './components/miembros/realizarpago/realizarpago.component';

import { PagosComponent } from './components/pagos/pagos/pagos.component';

import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { RolesComponent } from './components/usuarios/roles/roles.component';


import { ConfiguracionComponent } from './components/configuracion/configuracion/configuracion.component';

import { EntidadesComponent } from './components/entidades/entidades/entidades.component';
import { AgregarEntidadComponent } from './components/entidades/agregar-entidad/agregar-entidad.component';



export const routes: Routes = [
    {
        path:'',
        component: LoginComponent,
        
    },
    {
        path:'entidades',
        component: EntidadesComponent,
        pathMatch:'full'
    },
    {
        path:'entidades/agregar_entidad',
        component: AgregarEntidadComponent,
    },
    {
        path:'miembros',
        component: MiembrosComponent,
    },
    {
        path:'miembros-form/editar/:idmiembro',
        component: MiembrosFormComponent,
    },
    {
        path:'miembros-form/registrar',
        component: MiembrosFormComponent,
    },
    {
        path:'miembros/generarcredencial/:idmiembro',
        component: CredencialmiembroComponent,
    },
    {
        path:'membresias',
        component: MembresiasComponent,
    },
    {
        path:'membresias-form',
        component: MembresiasFormComponent,
    },
    {
        path:'usuarios',
        component: UsuariosComponent,
    },
    {
        path:'usuarios-form',
        component: UsuariosFormComponent,
    },
    {
        path:'usuarios-form/editar/:name',
        component: UsuariosFormComponent,
    },
    {
        path:'usuarios/roles',
        component: RolesComponent,
    },
    {
        path:'visitas',
        component: VisitasComponent,
    },
    {
        path:'registrarvisita',
        component: RegistrarVisitasComponent,
    },
    {
        path:'realizarpago',
        component: RealizarpagoComponent,
    },
    {
        path:'pagos',
        component: PagosComponent,
    },
    {
        path:'configuracion',
        component: ConfiguracionComponent,
    }
];
