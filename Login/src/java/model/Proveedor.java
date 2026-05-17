package model;
public class Proveedor {
    int id_proveedor;
    String ruc;
    String razon_social;
    String nombre_comercial;
    String direccion;
    String telefono;
    String email;

    public Proveedor() {}

    public Proveedor(int id_proveedor, String ruc, String razon_social, String nombre_comercial, String direccion, String telefono, String email) {
        this.id_proveedor = id_proveedor;
        this.ruc = ruc;
        this.razon_social = razon_social;
        this.nombre_comercial = nombre_comercial;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
    }

    public int getId_proveedor() {return id_proveedor;}
    public void setId_proveedor(int id_proveedor) {this.id_proveedor = id_proveedor;}

    public String getRuc() {return ruc;}
    public void setRuc(String ruc) {this.ruc = ruc;}

    public String getRazon_social() {return razon_social;}
    public void setRazon_social(String razon_social) {this.razon_social = razon_social;}

    public String getNombre_comercial() {return nombre_comercial;}
    public void setNombre_comercial(String nombre_comercial) {this.nombre_comercial = nombre_comercial;}

    public String getDireccion() {return direccion;}
    public void setDireccion(String direccion) {this.direccion = direccion;}

    public String getTelefono() {return telefono;}
    public void setTelefono(String telefono) {this.telefono = telefono;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
  
}
