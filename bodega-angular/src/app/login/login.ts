import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login {
  mensaje = '';
  private cdr = inject(ChangeDetectorRef);
  private loginService = inject(LoginService);
  private router = inject(Router);

  iniciarSesion(usuario: string, clave: string) {
    console.log(usuario, clave);

    this.loginService
    .obtenerUsuarios()
    .subscribe((usuarios:any)=>{

      const encontrado =
        usuarios.find((u:any)=>
          u.documento === usuario &&
          u.contrasena === clave
        );

      if(encontrado){
        this.mensaje='';
        this.router.navigate(
          ['/reportes']
        );
      }else{
        this.mensaje='Usuario o contraseña incorrectos';
        this.cdr.detectChanges();
      }
    });

}

  validarCredenciales(usuario: string, clave: string): boolean {
    if (usuario === 'admin' && clave === 'admin123') {
      return true;
    }
    return false;
  }

}
