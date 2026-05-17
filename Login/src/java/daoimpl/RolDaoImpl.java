package daoimpl;

import config.Conexion;
import dao.RolDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Rol;
import model.Usuario;

public class RolDaoImpl implements RolDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;

    @Override
    public List<Rol> obtener_roles(){
        List<Rol> roles = new ArrayList<>();
        String sql = "SELECT *FROM roles";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Rol r = new Rol();
                r.setId_rol(rs.getInt("id_rol"));
                r.setRol(rs.getString("rol"));
                r.setDescripcion(rs.getString("descripcion"));
                roles.add(r);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return roles;
    }
    
    @Override
    public Rol obtener_rol_por_id(int id){
        Rol r = new Rol();
        String sql = "SELECT * FROM roles WHERE id_rol = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                r.setId_rol(rs.getInt("id_rol"));
                r.setRol(rs.getString("rol"));
                r.setDescripcion(rs.getString("descripcion"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return r;
    }    
    
}
