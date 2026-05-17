package dao;

import java.util.List;
import model.Proveedor;

public interface ProveedorDao 
{
    public List<Proveedor> obtener_proveedores();
    public Proveedor obtener_proveedor_por_id(int id);
    public boolean insertar_proveedor(Proveedor p);
    public boolean actualizar_proveedor(Proveedor p);
    public boolean eliminar_proveedor(int id);
}
