package controller;

import dao.ProductoDao;
import daoimpl.ProductoDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import static java.lang.Integer.parseInt;
import model.Producto;

@WebServlet(name="ProductoController", urlPatterns={"/ProductoController"})
public class ProductoController extends HttpServlet{
    ProductoDao dao = new ProductoDaoImpl();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        
        // OBTENER JSON PARA MODAL
        if ("get".equals(action)) {
            int id = Integer.parseInt(req.getParameter("id"));
            Producto p = dao.obtener_producto_por_id(id);

            String json = "{"
                    + "\"id_producto\":" + p.getId_producto() + ","
                    + "\"sku\":\"" + p.getSku() + "\","
                    + "\"nombre\":\"" + p.getNombre() + "\","
                    + "\"descripcion\":\"" + p.getDescripcion() + "\","
                    + "\"id_categoria\":" + p.getId_categoria() + ","
                    + "\"marca\":\"" + p.getMarca() + "\","
                    + "\"unidad_medida\":\"" + p.getUnidad_medida() + "\""
                    + "}";

            resp.setContentType("application/json");
            resp.getWriter().write(json);
            return;
        }
        
        // MOSTRAR FORMULARIO DE EDICIÓN
        if ("edit".equals(action)) {
            int id = Integer.parseInt(req.getParameter("id"));
            Producto producto = dao.obtener_producto_por_id(id);
            req.setAttribute("producto", producto);
            req.getRequestDispatcher("producto.jsp").forward(req, resp);
            return;
        }
        
        if ("delete".equals(action)) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));
                dao.eliminar_producto(id);

                resp.sendRedirect(req.getContextPath() + "/productos.jsp"); // Redirigir de vuelta a la página
                return;
            } catch (Exception e) {
                e.printStackTrace();
                resp.sendRedirect(req.getContextPath() + "/productos.jsp?error=delete_failed");
                return;
            }
        }
        
        
        // LISTAR
        req.setAttribute("productos", dao.obtener_productos());
        req.getRequestDispatcher("productos.jsp").forward(req, resp);
    } 

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("create".equals(action)) {
            Producto p = new Producto();
            p.setSku(request.getParameter("sku"));
            p.setNombre(request.getParameter("nombre"));
            p.setDescripcion(request.getParameter("descripcion"));
            p.setMarca(request.getParameter("marca"));
            p.setId_categoria(parseInt(request.getParameter("id_categoria")));
            p.setUnidad_medida(request.getParameter("unidad_medida"));

            dao.insertar_producto(p);
            response.sendRedirect("ProductoController");
        }
        
        if ("update".equals(action)) {
            Producto p = new Producto();
            p.setId_producto(Integer.parseInt(request.getParameter("id")));
            p.setNombre(request.getParameter("nombre"));
            p.setDescripcion(request.getParameter("descripcion"));
            p.setMarca(request.getParameter("marca"));
            p.setId_categoria(parseInt(request.getParameter("id_categoria")));
            p.setUnidad_medida(request.getParameter("unidad_medida"));
           
            dao.actualizar_producto(p);
            response.sendRedirect("ProductoController");
        }
        
        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            dao.eliminar_producto(id);
            response.sendRedirect("ProductoController");
        }
    }    
}
