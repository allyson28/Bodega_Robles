package daoimpl;

import config.Conexion;
import dao.CompraDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Compra;

public class CompraDaoImpl implements CompraDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    @Override
    public List<Compra> obtener_compras(){
        List<Compra> compras = new ArrayList<>();
        String sql = "SELECT *FROM compras";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Compra c = new Compra();
                c.setId_compra(rs.getInt("id_compra"));
                c.setId_proveedor(rs.getInt("id_proveedor"));
                c.setId_usuario(rs.getInt("id_usuario"));
                c.setTotal(rs.getFloat("total"));
                c.setGuia_remision(rs.getString("guia_remision"));
                c.setFecha_registro(rs.getTimestamp("fecha_registro"));
                compras.add(c);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return compras;
    }
    
    @Override
    public Compra obtener_compra_por_id(int id){
        Compra c = new Compra();
        String sql = "SELECT * FROM compras WHERE id_compra = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                c.setId_compra(rs.getInt("id_compra"));
                c.setId_proveedor(rs.getInt("id_proveedor"));
                c.setId_usuario(rs.getInt("id_usuario"));
                c.setTotal(rs.getFloat("total"));
                c.setGuia_remision(rs.getString("guia_remision"));
                c.setFecha_registro(rs.getTimestamp("fecha_registro"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return c;
    }
    
    @Override
    public Integer insertar_compra(Compra c) {
        String sql = "INSERT INTO compras (id_proveedor, id_usuario, total, guia_remision) VALUES (?,?,?,?)";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            
            ps.setInt(1, c.getId_proveedor());
            ps.setInt(2, c.getId_usuario());
            ps.setFloat(3, c.getTotal());
            ps.setString(4, c.getGuia_remision());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) { // Obtener las claves generadas
                ResultSet generatedKeys = ps.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int idGenerado = generatedKeys.getInt(1);
                    return idGenerado;
                }
            }

        } catch (Exception e) {
            System.out.println("Error al registrar nueva compra: " + e); 
        }
        return null;
    }
       
    @Override
    public boolean actualizar_compra(Compra c) {
        String sql = "UPDATE compras SET id_proveedor = ?, id_usuario = ?, total = ?, guia_remision = ? WHERE id_compra = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setInt(1, c.getId_proveedor());
            ps.setInt(2, c.getId_usuario());
            ps.setFloat(3, c.getTotal());
            ps.setString(4, c.getGuia_remision());
            ps.setInt(5, c.getId_compra());
            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al actualizar información de la compra: " + e);
            return false;
        }
    }
    
    @Override
    public boolean eliminar_compra(int id) {
        String sql = "DELETE FROM compras WHERE id_compra = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al eliminar información de la compra: " + e);
            return false;
        }
    }    
}
