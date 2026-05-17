package daoimpl;

import model.DetalleCompra;
import dao.DetalleCompraDao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DetalleCompraDaoImpl implements DetalleCompraDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    @Override
    public List<DetalleCompra> obtener_detalle_compras(){
        List<DetalleCompra> detalle_compras = new ArrayList<>();
        String sql = "SELECT *FROM compras_detalle";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                DetalleCompra c = new DetalleCompra();
                
                c.setId_compra_detalle(rs.getInt("id_compra_detalle"));
                c.setId_compra(rs.getInt("id_compra"));
                c.setId_producto(rs.getInt("id_producto"));
                c.setCantidad(rs.getInt("cantidad"));
                c.setP_compra(rs.getFloat("p_compra"));
                c.setSubtotal(rs.getFloat("subtotal"));
                detalle_compras.add(c);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return detalle_compras;
    }
    
    @Override
    public DetalleCompra obtener_detalle_compra_por_id(int id){
        DetalleCompra c = new DetalleCompra();
        String sql = "SELECT *FROM compras_detalle WHERE id_compra_detalle = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                c.setId_compra_detalle(rs.getInt("id_compra_detalle"));
                c.setId_compra(rs.getInt("id_compra"));
                c.setId_producto(rs.getInt("id_producto"));
                c.setCantidad(rs.getInt("cantidad"));
                c.setP_compra(rs.getFloat("p_compra"));
                c.setSubtotal(rs.getFloat("subtotal"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return c;
    }
    
    @Override
    public boolean insertar_detalle_compra(DetalleCompra c) {
        String sql = "INSERT INTO compras_detalle (id_compra, id_producto, cantidad, p_compra) VALUES (?,?,?,?)";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            
            ps.setInt(1, c.getId_compra());
            ps.setInt(2, c.getId_producto());
            ps.setInt(3, c.getCantidad());
            ps.setFloat(4, c.getP_compra());

            int filas = ps.executeUpdate();
            return filas > 0;  // True si insertó correctamente

        } catch (Exception e) {
            System.out.println("Error al registrar nueva detalle_compra: " + e);
            return false;
        }
    }
    
    @Override
    public boolean eliminar_detalle_compra(int id) {
        String sql = "DELETE FROM compras_detalle WHERE id_compra_detalle = ?";
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
