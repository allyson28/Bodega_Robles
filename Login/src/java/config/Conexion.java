package config;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {
    private static final String URL = "jdbc:mysql://localhost:3306/bodega_robles";
    private static final String USER = "root";
    private static final String PASS = "root";

    public Connection getConexion() {
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(URL, USER, PASS);
        } catch (Exception e) {
            System.out.println("Error en conexión: " + e);
        }
        return con;
    }  
}

