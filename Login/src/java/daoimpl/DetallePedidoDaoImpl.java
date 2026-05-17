package daoimpl;

import config.Conexion;
import dao.DetallePedidoDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.DetallePedido;

public class DetallePedidoDaoImpl implements DetallePedidoDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;

    @Override
    public List<DetallePedido> obtener_detalle_pedidos(){
        List<DetallePedido> detalle_pedidos = new ArrayList<>();
        String sql = "SELECT *FROM detalle_pedidos";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                DetallePedido dp = new DetallePedido();
                dp.setId_pedido_detalle(rs.getInt("id_pedido_detalle"));
                dp.setId_pedido(rs.getInt("id_pedido"));
                dp.setId_producto(rs.getInt("id_producto"));
                dp.setP_venta(rs.getFloat("p_venta"));
                dp.setCantidad(rs.getInt("cantidad"));
                dp.setSubtotal(rs.getFloat("subtotal"));
                detalle_pedidos.add(dp);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return detalle_pedidos;
    }
    
    @Override
    public DetallePedido obtener_detalle_pedido_por_id(int id){
        DetallePedido dp = new DetallePedido();
        String sql = "SELECT *FROM detalle_pedidos WHERE id_pedido_detalle = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                dp.setId_pedido_detalle(rs.getInt("id_pedido_detalle"));
                dp.setId_pedido(rs.getInt("id_pedido"));
                dp.setId_producto(rs.getInt("id_producto"));
                dp.setP_venta(rs.getFloat("p_venta"));
                dp.setCantidad(rs.getInt("cantidad"));
                dp.setSubtotal(rs.getFloat("subtotal"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return dp;
    }
    
    @Override
    public boolean insertar_detalle_pedido(DetallePedido dp) {
        String sql = "INSERT INTO detalle_pedidos (id_pedido, id_producto, p_venta, cantidad) VALUES (?,?,?,?)";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            
            ps.setInt(1, dp.getId_pedido());
            ps.setInt(2, dp.getId_producto());
            ps.setFloat(3, dp.getP_venta());
            ps.setInt(4, dp.getCantidad());

            int filas = ps.executeUpdate();
            return filas > 0;  // True si insertó correctamente

        } catch (Exception e) {
            System.out.println("Error al registrar nueva detalle_pedido: " + e);
            return false;
        }
    }
    
    @Override
    public boolean eliminar_detalle_pedido(int id) {
        String sql = "DELETE FROM detalle_pedidos WHERE id_pedido_detalle = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al eliminar detalle compra: " + e);
            return false;
        }
    }       
    
}
