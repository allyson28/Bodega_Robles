package dao;

import java.util.List;
import model.Pedido;

public interface PedidoDao {
    List<Pedido> obtener_pedidos();
    Pedido obtener_pedido_por_id(int id);
    Integer insertar_pedido(Pedido p);
    boolean eliminar_pedido(int id); 
}
