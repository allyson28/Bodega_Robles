package dao;

import java.util.List;
import model.Usuario;

public interface UsuarioDao {
    public List<Usuario> obtener_usuarios();
    public Usuario obtener_usuario_por_documento(String documento);
    public Usuario obtener_usuario_por_id(int id);
    public boolean crear_usuario(Usuario u);
}
