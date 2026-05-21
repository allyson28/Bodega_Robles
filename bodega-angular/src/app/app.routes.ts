import { Routes } from '@angular/router';

import { Login } from './login/login';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Reportes } from "./reportes/reportes";
import { Inventario } from "./inventario/inventario";
import { Abastecimiento } from "./abastecimiento/abastecimiento";
import { Pedidos } from "./pedidos/pedidos";
import { Usuarios } from "./usuarios/usuarios";
import { Proveedores } from "./proveedores/proveedores";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a Login por defecto
  { path: 'login', component: Login },

  { path: '', component: DashboardLayout, children: [
    { path: 'reportes', component: Reportes },
    { path: 'inventario', component: Inventario },
    { path: 'abastecimiento', component: Abastecimiento },
    { path: 'pedidos', component: Pedidos },
    { path: 'usuarios', component: Usuarios },
    { path: 'proveedores', component: Proveedores }
  ] },
  { path: '**', redirectTo: 'login' } // Redirige a Login para rutas no encontradas
];
