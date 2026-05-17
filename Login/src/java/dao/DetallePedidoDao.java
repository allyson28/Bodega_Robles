package dao;

import java.util.List;
import model.DetallePedido;

public interface DetallePedidoDao {
    List<DetallePedido> obtener_detalle_pedidos();
    DetallePedido obtener_detalle_pedido_por_id(int id);
    boolean insertar_detalle_pedido(DetallePedido dp);
    boolean eliminar_detalle_pedido(int id);
}
