import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Login } from './login/login';
import { Reportes } from "./reportes/reportes";
import { Inventario } from "./inventario/inventario";
import { Abastecimiento } from "./abastecimiento/abastecimiento";
import { Pedidos } from "./pedidos/pedidos";
import { Usuarios } from "./usuarios/usuarios";
import { Proveedores } from "./proveedores/proveedores";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Login, Reportes, Inventario, Abastecimiento, Pedidos, Usuarios, Proveedores],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bodega-angular');
}
