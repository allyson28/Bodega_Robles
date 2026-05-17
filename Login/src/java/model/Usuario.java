package model;

public class Usuario {
    int id_usuario;
    int id_rol;
    String documento;
    String contrasena;
    String nombres;
    String telefono;
    String correo;

    public Usuario() {}

    public Usuario(int id_usuario, int id_rol, String documento, String contrasena, String nombres, String telefono, String correo) {
        this.id_usuario = id_usuario;
        this.id_rol = id_rol;
        this.documento = documento;
        this.contrasena = contrasena;
        this.nombres = nombres;
        this.telefono = telefono;
        this.correo = correo;
    }

    public int getId_usuario() {return id_usuario;}
    public void setId_usuario(int id_usuario) {this.id_usuario = id_usuario;}

    public int getId_rol() {return id_rol;}
    public void setId_rol(int id_rol) {this.id_rol = id_rol;}

    public String getDocumento() {return documento;}
    public void setDocumento(String documento) {this.documento = documento;}

    public String getContrasena() {return contrasena;}
    public void setContrasena(String contrasena) {this.contrasena = contrasena;}

    public String getNombres() {return nombres;}
    public void setNombres(String nombres) {this.nombres = nombres;}

    public String getTelefono() {return telefono;}
    public void setTelefono(String telefono) {this.telefono = telefono;}

    public String getCorreo() {return correo;}
    public void setCorreo(String correo) {this.correo = correo;} 
}
