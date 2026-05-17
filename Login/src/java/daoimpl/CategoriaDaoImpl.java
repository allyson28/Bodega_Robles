package daoimpl;

import config.Conexion;
import dao.CategoriaDao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Categoria;

public class CategoriaDaoImpl implements CategoriaDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    @Override
    public List<Categoria> obtener_categorias(){
        List<Categoria> categorias = new ArrayList<>();
        String sql = "SELECT *FROM categorias";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Categoria c = new Categoria();
                c.setId_categoria(rs.getInt("id_categoria"));
                c.setNombre(rs.getString("nombre"));
                c.setDescripcion(rs.getString("descripcion"));
                categorias.add(c);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return categorias;
    }
    
    @Override
    public Categoria obtener_categoria_por_id(int id){
        Categoria c = new Categoria();
        String sql = "SELECT * FROM categorias WHERE id_categoria = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                c.setId_categoria(rs.getInt("id_categoria"));
                c.setNombre(rs.getString("nombre"));
                c.setDescripcion(rs.getString("descripcion"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return c;
    }
    
    @Override
    public boolean insertar_categoria(Categoria c) {
        String sql = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";

        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setString(1, c.getNombre());
            ps.setString(2, c.getDescripcion());

            int filas = ps.executeUpdate();
            return filas > 0;  // True si insertó correctamente

        } catch (Exception e) {
            System.out.println("Error al insertar categoría: " + e);
            return false;
        }
    }

    @Override
    public boolean actualizar_categoria(Categoria c) {
        String sql = "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?";

        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setString(1, c.getNombre());
            ps.setString(2, c.getDescripcion());
            ps.setInt(3, c.getId_categoria());

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al actualizar categoría: " + e);
            return false;
        }
    }
    
    @Override
    public boolean eliminar_categoria(int id) {
        String sql = "DELETE FROM categorias WHERE id_categoria = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al eliminar categoría: " + e);
            return false;
        }
    }    

}
