package model;

public class DetalleCompra {
    int id_compra_detalle;
    int id_compra;
    int id_producto;
    int cantidad;
    float p_compra;
    float subtotal;

    public DetalleCompra() {}

    public DetalleCompra(int id_compra_detalle, int id_compra, int id_producto, int cantidad, float p_compra, float subtotal) {
        this.id_compra_detalle = id_compra_detalle;
        this.id_compra = id_compra;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.p_compra = p_compra;
        this.subtotal = subtotal;
    }

    public int getId_compra_detalle() {return id_compra_detalle;}
    public void setId_compra_detalle(int id_compra_detalle) {this.id_compra_detalle = id_compra_detalle;}

    public int getId_compra() {return id_compra;}
    public void setId_compra(int id_compra) {this.id_compra = id_compra;}

    public int getId_producto() {return id_producto;}
    public void setId_producto(int id_producto) {this.id_producto = id_producto;}

    public int getCantidad() {return cantidad;}
    public void setCantidad(int cantidad) {this.cantidad = cantidad;}

    public float getP_compra() {return p_compra;}
    public void setP_compra(float p_compra) {this.p_compra = p_compra;}

    public float getSubtotal() {return subtotal;}
    public void setSubtotal(float subtotal) {this.subtotal = subtotal;}   
}
