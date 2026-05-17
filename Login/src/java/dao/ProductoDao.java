
package dao;

import java.util.List;
import model.Producto;

public interface ProductoDao {
    public List<Producto> obtener_productos();
    public Producto obtener_producto_por_id(int id);
    public boolean insertar_producto(Producto p);
    public boolean actualizar_producto(Producto p);
    public boolean eliminar_producto(int id);
}
