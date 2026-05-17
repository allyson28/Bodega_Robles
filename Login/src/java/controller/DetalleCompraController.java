package controller;

import dao.DetalleCompraDao;
import daoimpl.DetalleCompraDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import model.DetalleCompra;
import model.Producto;

@WebServlet(name="DetalleCompraController", urlPatterns={"/DetalleCompraController"})
public class DetalleCompraController extends HttpServlet{
    DetalleCompraDao dao = new DetalleCompraDaoImpl();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        
        if ("delete".equals(action)) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));
                dao.eliminar_detalle_compra(id);

                resp.sendRedirect(req.getContextPath() + "/abastecimiento.jsp"); // Redirigir de vuelta a la página
                return;
            } catch (Exception e) {
                e.printStackTrace();
                resp.sendRedirect(req.getContextPath() + "/abastecimiento.jsp?error=delete_failed");
                return;
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("add".equals(action)) { // 1) AGREGAR AL CARRITO (NO BD)
            HttpSession session = request.getSession();

            List<DetalleCompra> carrito = (List<DetalleCompra>) session.getAttribute("carrito_compra"); // Recuperar el carrito de la sesión
            if (carrito == null) { // Si no existe aún, se crea
                carrito = new ArrayList<>();
            }

            DetalleCompra d = new DetalleCompra();
            d.setId_producto(Integer.parseInt(request.getParameter("id_producto")));
            d.setCantidad(Integer.parseInt(request.getParameter("cantidad")));
            d.setP_compra(Float.parseFloat(request.getParameter("p_unitario")));
            carrito.add(d);

            session.setAttribute("carrito_compra", carrito); // Guardar carrito actualizado
            response.sendRedirect("abastecimiento.jsp?modal=open");
            return;
        }

        if ("create".equals(action)) {
            int idCompra = Integer.parseInt(request.getParameter("id_compra"));

            HttpSession session = request.getSession();
            List<DetalleCompra> carrito = 
                (List<DetalleCompra>) session.getAttribute("carrito_compra");

            if (carrito != null) {
                for (DetalleCompra d : carrito) {
                    d.setId_compra(idCompra);
                    dao.insertar_detalle_compra(d);
                }

                session.removeAttribute("carrito_compra");
            }
            response.sendRedirect("CompraController");
        }

        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            dao.eliminar_detalle_compra(id);
            response.sendRedirect("CompraController");
        }
    }
}
