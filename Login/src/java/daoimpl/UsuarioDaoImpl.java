package daoimpl;

import config.Conexion;
import dao.UsuarioDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Usuario;

public class UsuarioDaoImpl implements UsuarioDao{
    Conexion cnn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;

    @Override
    public List<Usuario> obtener_usuarios(){
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT *FROM usuarios";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Usuario u = new Usuario();
                u.setId_usuario(rs.getInt("id_usuario"));
                u.setId_rol(rs.getInt("id_rol"));
                u.setDocumento(rs.getString("documento"));
                u.setContrasena(rs.getString("contrasena"));
                u.setNombres(rs.getString("nombres"));
                u.setTelefono(rs.getString("telefono"));
                u.setCorreo(rs.getString("correo"));
                usuarios.add(u);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return usuarios;
    }
    
    @Override
    public Usuario obtener_usuario_por_documento(String documento){
        Usuario u = new Usuario();
        String sql = "SELECT * FROM usuarios WHERE documento = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, documento);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                u.setId_usuario(rs.getInt("id_usuario"));
                u.setId_rol(rs.getInt("id_rol"));
                u.setDocumento(rs.getString("documento"));
                u.setContrasena(rs.getString("contrasena"));
                u.setNombres(rs.getString("nombres"));
                u.setTelefono(rs.getString("telefono"));
                u.setCorreo(rs.getString("correo"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return u;
    }

    @Override
    public Usuario obtener_usuario_por_id(int id){
        Usuario u = new Usuario();
        String sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            
            rs = ps.executeQuery();

            if (rs.next()) {
                u.setId_usuario(rs.getInt("id_usuario"));
                u.setId_rol(rs.getInt("id_rol"));
                u.setDocumento(rs.getString("documento"));
                u.setContrasena(rs.getString("contrasena"));
                u.setNombres(rs.getString("nombres"));
                u.setTelefono(rs.getString("telefono"));
                u.setCorreo(rs.getString("correo"));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }        
        return u;
    }
    
    @Override
    public boolean crear_usuario(Usuario u) {
        String sql = "INSERT INTO usuarios (id_rol, documento, contrasena, nombres, telefono, correo) VALUES (?,?,?,?,?,?)";

        try {
            con = cnn.getConexion();
            ps = con.prepareStatement(sql);

            ps.setInt(1, u.getId_rol());
            ps.setString(2, u.getDocumento());
            ps.setString(3, u.getContrasena());
            ps.setString(4, u.getNombres());
            ps.setString(5, u.getTelefono());
            ps.setString(6, u.getCorreo());

            int filas = ps.executeUpdate();
            return filas > 0;  // True si insertó correctamente

        } catch (Exception e) {
            System.out.println("Error al crear usuario: " + e);
            return false;
        }
    }
    
}
