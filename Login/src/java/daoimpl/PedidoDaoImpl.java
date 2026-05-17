package daoimpl;

import config.Conexion;
import dao.PedidoDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Pedido;

public class PedidoDaoImpl implements PedidoDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;

    @Override
    public List<Pedido> obtener_pedidos(){
        List<Pedido> pedidos = new ArrayList<>();
        String sql = "SELECT *FROM pedidos";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Pedido p = new Pedido();
                p.setId_pedido(rs.getInt("id_pedido"));
                p.setId_usuario(rs.getInt("id_usuario"));
                p.setTotal(rs.getFloat("total"));
                p.setDireccion_entrega(rs.getString("direccion_entrega"));
                p.setFecha_registro(rs.getTimestamp("fecha_registro"));
                pedidos.add(p);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return pedidos;
    }
    
    @Override
    public Pedido obtener_pedido_por_id(int id){
        Pedido p = new Pedido();
        String sql = "SELECT *FROM pedidos WHERE id_pedido = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                p.setId_pedido(rs.getInt("id_pedido"));
                p.setId_usuario(rs.getInt("id_usuario"));
                p.setTotal(rs.getFloat("total"));
                p.setDireccion_entrega(rs.getString("direccion_entrega"));
                p.setFecha_registro(rs.getTimestamp("fecha_registro"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return p;
    }
    
    @Override
    public Integer insertar_pedido(Pedido p) {
        String sql = "INSERT INTO pedidos (id_usuario, total, direccion_entrega) VALUES (?,?,?)";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            
            ps.setInt(1, p.getId_usuario());
            ps.setFloat(2, p.getTotal());
            ps.setString(3, p.getDireccion_entrega());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) { // Obtener las claves generadas
                ResultSet generatedKeys = ps.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int idGenerado = generatedKeys.getInt(1);
                    return idGenerado;
                }
            }

        } catch (Exception e) {
            System.out.println("Error al registrar pedido: " + e); 
        }
        return null;
    }
           
    @Override
    public boolean eliminar_pedido(int id) {
        String sql = "DELETE FROM pedidos WHERE id_pedido = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al eliminar información de la pedido: " + e);
            return false;
        }
    }    
}
