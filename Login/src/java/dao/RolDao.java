package dao;

import java.util.List;
import model.Rol;

public interface RolDao {
    public List<Rol> obtener_roles();
    public Rol obtener_rol_por_id(int id);
}
