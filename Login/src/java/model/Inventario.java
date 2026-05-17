package model;

public class Inventario {
    int id_inventario;
    int id_producto;
    int stock_actual;
    int stock_minimo;
    int stock_maximo;

    public Inventario() {
    }

    public Inventario(int id_inventario, int id_producto, int stock_actual, int stock_minimo, int stock_maximo) {
        this.id_inventario = id_inventario;
        this.id_producto = id_producto;
        this.stock_actual = stock_actual;
        this.stock_minimo = stock_minimo;
        this.stock_maximo = stock_maximo;
    }

    public int getId_inventario() {return id_inventario;}
    public void setId_inventario(int id_inventario) {this.id_inventario = id_inventario;}

    public int getId_producto() {return id_producto;}
    public void setId_producto(int id_producto) {this.id_producto = id_producto;}

    public int getStock_actual() {return stock_actual;}
    public void setStock_actual(int stock_actual) {this.stock_actual = stock_actual;}

    public int getStock_minimo() {return stock_minimo;}
    public void setStock_minimo(int stock_minimo) {this.stock_minimo = stock_minimo;}

    public int getStock_maximo() {return stock_maximo;}
    public void setStock_maximo(int stock_maximo) {this.stock_maximo = stock_maximo;} 
}
