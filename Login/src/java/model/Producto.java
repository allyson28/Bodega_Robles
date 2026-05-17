package model;

public class Producto {
    int id_producto;
    int id_categoria; // Clave foranea
    String sku;
    String nombre;
    String descripcion;
    String marca;
    String unidad_medida;

    public Producto() {
    }

    public Producto(int id_producto, int id_categoria, String sku, String nombre, String descripcion, String marca, String unidad_medida) {
        this.id_producto = id_producto;
        this.id_categoria = id_categoria;
        this.sku = sku;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.unidad_medida = unidad_medida;
    }

    public int getId_producto() {return id_producto;}
    public void setId_producto(int id_producto) {this.id_producto = id_producto;}

    public int getId_categoria() {return id_categoria;}
    public void setId_categoria(int id_categoria) {this.id_categoria = id_categoria;}

    public String getSku() {return sku;}
    public void setSku(String sku) {this.sku = sku;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}

    public String getMarca() {return marca;}
    public void setMarca(String marca) {this.marca = marca;}

    public String getUnidad_medida() {return unidad_medida;}
    public void setUnidad_medida(String unidad_medida) {this.unidad_medida = unidad_medida;}
}
