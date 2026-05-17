import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})

export class Reportes {

  totalVentas = 18500.75;
  numeroVentas = 78;
  productosVendidos = 430;

  reportes = [
  {
    fecha: '14/11/2025',
    ventas: 15,
    productos: 80,
    subtotal: 3500,
    igv: 630,
    total: 4130
  }
];
}


