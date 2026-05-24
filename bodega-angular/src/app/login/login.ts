import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router); // Inyecta el Router para redirigir después del inicio de sesión

  // Modificamos los parámetros para recibir el usuario y la clave
  iniciarSesion(usuario: string, clave: string) {
    console.log('Intentando iniciar sesión con:', usuario, clave);

    if (this.validarCredenciales(usuario, clave)) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/reportes']); // Redirige solo si es válido
    } else {
      console.error('Credenciales inválidas');
      // Aquí podrías setear una variable para mostrar un alert de Bootstrap en el HTML
    }
  }

  validarCredenciales(usuario: string, clave: string): boolean {
      if (usuario === 'admin' && clave === 'admin123') {
        return true;
      }
      return false;
  }


}
