package dao;

import java.util.List;
import model.DetalleCompra;

public interface DetalleCompraDao {
    public DetalleCompra obtener_detalle_compra_por_id(int id);
    public boolean insertar_detalle_compra(DetalleCompra c);
    public List<DetalleCompra> obtener_detalle_compras();
    public boolean eliminar_detalle_compra(int id);
}
