package model;
import java.sql.Timestamp;

public class Compra {
    int id_compra;
    int id_proveedor;
    int id_usuario;
    float total;
    String guia_remision;
    Timestamp fecha_registro;

    public Compra() {
    }

    public Compra(int id_compra, int id_proveedor, int id_usuario, float total, String guia_remision, Timestamp fecha_registro) {
        this.id_compra = id_compra;
        this.id_proveedor = id_proveedor;
        this.id_usuario = id_usuario;
        this.total = total;
        this.guia_remision = guia_remision;
        this.fecha_registro = fecha_registro;
    }

    public int getId_compra() {return id_compra;}
    public void setId_compra(int id_compra) {this.id_compra = id_compra;}

    public int getId_proveedor() {return id_proveedor;}
    public void setId_proveedor(int id_proveedor) {this.id_proveedor = id_proveedor;}

    public int getId_usuario() {return id_usuario;}
    public void setId_usuario(int id_usuario) {this.id_usuario = id_usuario;}

    public float getTotal() {return total;}
    public void setTotal(float total) {this.total = total;}

    public String getGuia_remision() {return guia_remision;}
    public void setGuia_remision(String guia_remision) {this.guia_remision = guia_remision;}

    public Timestamp getFecha_registro() {return fecha_registro;}
    public void setFecha_registro(Timestamp fecha_registro) {this.fecha_registro = fecha_registro;}
}
