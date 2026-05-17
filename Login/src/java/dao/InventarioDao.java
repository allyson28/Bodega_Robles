package dao;

import model.Inventario;

public interface InventarioDao {
    public Inventario obtener_inventario_por_id_producto(int id);
}
