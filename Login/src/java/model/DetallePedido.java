package model;

public class DetallePedido {
    int id_pedido_detalle;
    int id_pedido;
    int id_producto;
    float p_venta;
    int cantidad;
    float subtotal;

    public DetallePedido() {}

    public DetallePedido(int id_pedido_detalle, int id_pedido, int id_producto, float p_venta, int cantidad, float subtotal) {
        this.id_pedido_detalle = id_pedido_detalle;
        this.id_pedido = id_pedido;
        this.id_producto = id_producto;
        this.p_venta = p_venta;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }

    public int getId_pedido_detalle() {return id_pedido_detalle;}
    public void setId_pedido_detalle(int id_pedido_detalle) {this.id_pedido_detalle = id_pedido_detalle;}

    public int getId_pedido() {return id_pedido;}
    public void setId_pedido(int id_pedido) {this.id_pedido = id_pedido;}

    public int getId_producto() {return id_producto;}
    public void setId_producto(int id_producto) {this.id_producto = id_producto;}

    public float getP_venta() {return p_venta;}
    public void setP_venta(float p_venta) {this.p_venta = p_venta;}

    public int getCantidad() {return cantidad;}
    public void setCantidad(int cantidad) {this.cantidad = cantidad;}

    public float getSubtotal() {return subtotal;}
    public void setSubtotal(float subtotal) {this.subtotal = subtotal;} 
}
