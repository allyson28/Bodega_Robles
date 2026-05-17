package controller;

import dao.ProveedorDao;
import daoimpl.ProveedorDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import model.Proveedor;

@WebServlet(name="ProveedorController", urlPatterns={"/ProveedorController"})
public class ProveedorController extends HttpServlet{
    ProveedorDao dao = new ProveedorDaoImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        
        // OBTENER JSON PARA MODAL
        if ("get".equals(action)) {
            int id = Integer.parseInt(req.getParameter("id"));
            Proveedor p = dao.obtener_proveedor_por_id(id);

            String json = "{"
                    + "\"id_proveedor\":" + p.getId_proveedor() + ","
                    + "\"ruc\":\"" + p.getRuc() + "\","
                    + "\"razon_social\":\"" + p.getRazon_social() + "\","
                    + "\"nombre_comercial\":\"" + p.getNombre_comercial() + "\","
                    + "\"direccion\":\"" + p.getDireccion() + "\","
                    + "\"telefono\":\"" + p.getTelefono() + "\","
                    + "\"email\":\"" + p.getEmail() + "\""
                    + "}";
            resp.setContentType("application/json");
            resp.getWriter().write(json);
            return;
        }
        
        // MOSTRAR FORMULARIO DE EDICIÓN
        if ("edit".equals(action)) {
            int id = Integer.parseInt(req.getParameter("id"));
            Proveedor proveedor = dao.obtener_proveedor_por_id(id);
            req.setAttribute("proveedor", proveedor);
            req.getRequestDispatcher("proveedores.jsp").forward(req, resp);
            return;
        }
        
        if ("delete".equals(action)) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));
                dao.eliminar_proveedor(id);

                resp.sendRedirect(req.getContextPath() + "/proveedores.jsp"); // Redirigir de vuelta a la página
                return;
            } catch (Exception e) {
                e.printStackTrace();
                resp.sendRedirect(req.getContextPath() + "/proveedores.jsp?error=delete_failed");
                return;
            }
        }     
        
        // LISTAR
        req.setAttribute("proveedores", dao.obtener_proveedores());
        req.getRequestDispatcher("proveedores.jsp").forward(req, resp);
    } 

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("create".equals(action)) {
            Proveedor p = new Proveedor();
            p.setRuc(request.getParameter("ruc"));
            p.setRazon_social(request.getParameter("razon_social"));
            p.setNombre_comercial(request.getParameter("nombre_comercial"));
            p.setDireccion(request.getParameter("direccion"));
            p.setTelefono(request.getParameter("telefono"));
            p.setEmail(request.getParameter("email"));
            
            dao.insertar_proveedor(p);
            response.sendRedirect("ProveedorController");
        }
        
        if ("update".equals(action)) {
            Proveedor p = new Proveedor();
            p.setId_proveedor(Integer.parseInt(request.getParameter("id")));
            p.setRuc(request.getParameter("ruc"));
            p.setRazon_social(request.getParameter("razon_social"));
            p.setNombre_comercial(request.getParameter("nombre_comercial"));
            p.setDireccion(request.getParameter("direccion"));
            p.setTelefono(request.getParameter("telefono"));
            p.setEmail(request.getParameter("email"));            

            dao.actualizar_proveedor(p);
            response.sendRedirect("ProveedorController");
        }
        
        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            dao.eliminar_proveedor(id);
            response.sendRedirect("ProveedorController");
        }
    }    
    
}
