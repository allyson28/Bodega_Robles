import { Component, inject } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
// Estado para saber si el menú está minimizado
  isCollapsed = false;
  private router = inject(Router); // Inyecta el Router para redirigir después del inicio de sesión

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  cerrarSesion() {
    this.router.navigate(['/login']); // Redirige solo si es válido
    console.log('Sesión cerrada');
  }
}
