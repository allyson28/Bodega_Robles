package dao;

import java.util.List;
import model.Categoria;

public interface CategoriaDao {
    public List<Categoria> obtener_categorias();
    public Categoria obtener_categoria_por_id(int id);
    public boolean insertar_categoria(Categoria c);
    public boolean actualizar_categoria(Categoria c);
    public boolean eliminar_categoria(int c);
}
