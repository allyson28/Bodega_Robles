package daoimpl;

import config.Conexion;
import dao.ProductoDao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Producto;

public class ProductoDaoImpl implements ProductoDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    @Override
    public List<Producto> obtener_productos(){
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT *FROM productos";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Producto p = new Producto();
                p.setId_producto(rs.getInt("id_producto"));
                p.setId_categoria(rs.getInt("id_categoria"));
                p.setSku(rs.getString("sku"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setMarca(rs.getString("marca"));
                p.setUnidad_medida(rs.getString("unidad_medida"));
                productos.add(p);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return productos;
    }
    
    @Override
    public Producto obtener_producto_por_id(int id){
        Producto p = new Producto();
        String sql = "SELECT * FROM productos WHERE id_producto = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                p.setId_producto(rs.getInt("id_producto"));
                p.setId_categoria(rs.getInt("id_categoria"));
                p.setSku(rs.getString("sku"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setMarca(rs.getString("marca"));
                p.setUnidad_medida(rs.getString("unidad_medida"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return p;
    }
    
    @Override
    public boolean insertar_producto(Producto p){
        String sql = "INSERT INTO productos (sku, nombre, descripcion, marca, id_categoria, unidad_medida) VALUES (?,?,?,?,?,?)";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setString(1, p.getSku());
            ps.setString(2, p.getNombre());
            ps.setString(3, p.getDescripcion());
            ps.setString(4, p.getMarca());
            ps.setInt(5, p.getId_categoria());
            ps.setString(6, p.getUnidad_medida());

            int filas = ps.executeUpdate();
            return filas > 0;  // True si insertó correctamente

        } catch (Exception e) {
            System.out.println("Error al insertar producto: " + e);
            return false;
        }        
    }

    @Override
    public boolean actualizar_producto(Producto p) {
        String sql = "UPDATE productos SET nombre = ?, descripcion = ?, marca = ?, id_categoria = ?, unidad_medida = ?  WHERE id_producto = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setString(1, p.getNombre());
            ps.setString(2, p.getDescripcion());
            ps.setString(3, p.getMarca());
            ps.setInt(4, p.getId_categoria());
            ps.setString(5, p.getUnidad_medida());
            ps.setInt(6, p.getId_producto());

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al actualizar producto: " + e);
            return false;
        }
    }
    
    @Override
    public boolean eliminar_producto(int id) {
        String sql = "DELETE FROM productos WHERE id_producto = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al eliminar producto: " + e);
            return false;
        }
    } 
    
    
    
    
    
    
    
}
