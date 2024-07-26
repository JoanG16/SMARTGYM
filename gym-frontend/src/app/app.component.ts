import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';import { Observable, of } from 'rxjs';


import { ComprasService } from './services/compras/compras.service'; // Ajusta la ruta según tu estructura


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'gym-frontend';
  totalCaja$: Observable<any> = of(null);

  constructor(private comprasService: ComprasService) {}

  ngOnInit(): void {
    this.totalCaja$ = this.comprasService.getCajaActualizada();
  }
}
