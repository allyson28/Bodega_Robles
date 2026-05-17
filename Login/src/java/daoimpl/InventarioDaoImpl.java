package daoimpl;

import config.Conexion;
import dao.InventarioDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.Inventario;

public class InventarioDaoImpl implements InventarioDao {
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    @Override
    public Inventario obtener_inventario_por_id_producto (int id){
        Inventario inv = new Inventario();
        String sql = "SELECT *FROM inventario WHERE id_producto = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();
            if (rs.next()) {
                inv.setId_inventario(rs.getInt("id_inventario"));
                inv.setId_producto(rs.getInt("id_producto"));
                inv.setStock_actual(rs.getInt("stock_actual"));
                inv.setStock_maximo(rs.getInt("stock_minimo"));
                inv.setStock_minimo(rs.getInt("stock_maximo"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return inv;
    }
    
}
