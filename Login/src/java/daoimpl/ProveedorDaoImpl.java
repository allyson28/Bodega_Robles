package daoimpl;

import config.Conexion;
import dao.ProveedorDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Proveedor;

public class ProveedorDaoImpl implements ProveedorDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    @Override
    public List<Proveedor> obtener_proveedores(){
        List<Proveedor> proveedores = new ArrayList<>();
        String sql = "SELECT *FROM proveedores";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Proveedor p = new Proveedor();
                p.setId_proveedor(rs.getInt("id_proveedor"));
                p.setRuc(rs.getString("ruc"));
                p.setRazon_social(rs.getString("razon_social"));
                p.setNombre_comercial(rs.getString("nombre_comercial"));
                p.setDireccion(rs.getString("direccion"));
                p.setTelefono(rs.getString("telefono"));
                p.setEmail(rs.getString("email"));
                proveedores.add(p);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return proveedores;
    }
    
    @Override
    public Proveedor obtener_proveedor_por_id(int id){
        Proveedor p = new Proveedor();
        String sql = "SELECT * FROM proveedores WHERE id_proveedor = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                p.setId_proveedor(rs.getInt("id_proveedor"));
                p.setRuc(rs.getString("ruc"));
                p.setRazon_social(rs.getString("razon_social"));
                p.setNombre_comercial(rs.getString("nombre_comercial"));
                p.setDireccion(rs.getString("direccion"));
                p.setTelefono(rs.getString("telefono"));
                p.setEmail(rs.getString("email"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return p;
    }
    
    @Override
    public boolean insertar_proveedor(Proveedor p) {
        String sql = "INSERT INTO proveedores (ruc, razon_social, nombre_comercial, direccion, telefono, email) VALUES (?,?,?,?,?,?)";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            
            ps.setString(1, p.getRuc());
            ps.setString(2, p.getRazon_social());
            ps.setString(3, p.getNombre_comercial());
            ps.setString(4, p.getDireccion());
            ps.setString(5, p.getTelefono());
            ps.setString(6, p.getEmail());

            int filas = ps.executeUpdate();
            return filas > 0;  // True si insertó correctamente

        } catch (Exception e) {
            System.out.println("Error al insertar nuevo proveedor: " + e);
            return false;
        }
    }

    @Override
    public boolean actualizar_proveedor(Proveedor p) {
        String sql = "UPDATE proveedores SET ruc = ?, razon_social = ?, nombre_comercial = ?, direccion = ?, telefono = ?, email = ? WHERE id_proveedor = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setString(1, p.getRuc());
            ps.setString(2, p.getRazon_social());
            ps.setString(3, p.getNombre_comercial());
            ps.setString(4, p.getDireccion());
            ps.setString(5, p.getTelefono());
            ps.setString(6, p.getEmail());
            ps.setInt(7, p.getId_proveedor());

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al actualizar información de proveedor: " + e);
            return false;
        }
    }
    
    @Override
    public boolean eliminar_proveedor(int id) {
        String sql = "DELETE FROM proveedores WHERE id_proveedor = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            int filas = ps.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.out.println("Error al eliminar información de proveedor: " + e);
            return false;
        }
    }    
}
