package model;

public class Rol {
    int id_rol;
    String rol;
    String descripcion;

    public Rol() {
    }

    public Rol(int id_rol, String rol, String descripcion) {
        this.id_rol = id_rol;
        this.rol = rol;
        this.descripcion = descripcion;
    }

    public int getId_rol() {return id_rol;}
    public void setId_rol(int id_rol) {this.id_rol = id_rol;}

    public String getRol() {return rol;}
    public void setRol(String rol) {this.rol = rol;}

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
 
}
