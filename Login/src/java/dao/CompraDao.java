package dao;

import java.util.List;
import model.Compra;

public interface CompraDao {
    public List<Compra> obtener_compras();
    public Compra obtener_compra_por_id(int id);
    public Integer insertar_compra(Compra c);
    public boolean actualizar_compra(Compra c);
    public boolean eliminar_compra(int id);
}
