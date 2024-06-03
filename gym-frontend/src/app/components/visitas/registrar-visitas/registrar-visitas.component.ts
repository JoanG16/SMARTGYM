import { Component, NgModule, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';



@Component({
  selector: 'app-registrar-visitas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink ],
  templateUrl: './registrar-visitas.component.html',
  styleUrl: './registrar-visitas.component.css'
})
export class RegistrarVisitasComponent implements OnInit {

  miembros: Miembro[] = [
    { id: 1, nombre: 'Caterva', estado: 'ACTIVO', membresia: 'Mensual', foto: "https://imagenes.expreso.ec/files/image_440_279/uploads/2024/01/12/65a13da37ad25.jpeg", fechaVencimiento: "25-05-2024"},
    { id: 2, nombre: 'Mia', estado: 'VENCIDO', membresia: 'Anual', foto: "https://www.laprensa.hn/binrepository/1200x800/0c85/1200d630/none/11004/YMHU/miakhalifa.103_LP1064167_MG67666684.jpg", fechaVencimiento: "25-05-2025" }
  ];

  miembroSeleccionado: Miembro | undefined;

  onSelectMiembro(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    if (selectedIndex !== -1) {
      this.miembroSeleccionado = this.miembros[selectedIndex - 1];
    } else {
      this.miembroSeleccionado = undefined;
    }
  }

  mostrarCard(): boolean {
    return !!this.miembroSeleccionado;
  }

  ocultarRegistrarVisitaRegular(): boolean {
    return !!this.miembroSeleccionado;
  }


  constructor() { }

  ngOnInit(): void {
  }

  generarmembresia(): void {
    // Aquí puedes agregar la lógica necesaria para recargar el componente
    window.location.reload(); // Esto recargará toda la página, incluido el componente
  }
  
}

export interface Miembro {
  id: number;
  nombre: string;
  estado: string;
  membresia: string;
  foto: string; // URL de la foto del miembro
  fechaVencimiento: string; // Fecha de vencimiento de la membresía
}
