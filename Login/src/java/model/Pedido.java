package model;

import java.sql.Timestamp;

public class Pedido {
    int id_pedido;
    int id_usuario;
    float total;
    String direccion_entrega;
    Timestamp fecha_registro;

    public Pedido() {
    }

    public Pedido(int id_pedido, int id_usuario, float total, String direccion, Timestamp fecha_registro) {
        this.id_pedido = id_pedido;
        this.id_usuario = id_usuario;
        this.total = total;
        this.fecha_registro = fecha_registro;
        this.direccion_entrega = direccion;
    }

    public int getId_pedido() {return id_pedido;}
    public void setId_pedido(int id_pedido) {this.id_pedido = id_pedido;}

    public int getId_usuario() {return id_usuario;}
    public void setId_usuario(int id_usuario) {this.id_usuario = id_usuario;}

    public float getTotal() {return total;}
    public void setTotal(float total) {this.total = total;}

    public String getDireccion_entrega() {return direccion_entrega;}
    public void setDireccion_entrega(String direccion_entrega) {this.direccion_entrega = direccion_entrega;}

    public Timestamp getFecha_registro() {return fecha_registro;}
    public void setFecha_registro(Timestamp fecha_registro) {this.fecha_registro = fecha_registro;}
    
}
