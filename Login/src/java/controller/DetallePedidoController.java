package controller;

import dao.DetallePedidoDao;
import daoimpl.DetallePedidoDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import model.DetallePedido;

@WebServlet(name="DetallePedidoController", urlPatterns={"/DetallePedidoController"})
public class DetallePedidoController extends HttpServlet{
    DetallePedidoDao dao = new DetallePedidoDaoImpl();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        
        if ("delete".equals(action)) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));
                dao.eliminar_detalle_pedido(id);

                resp.sendRedirect(req.getContextPath() + "/pedidos.jsp"); // Redirigir de vuelta a la página
                return;
            } catch (Exception e) {
                e.printStackTrace();
                resp.sendRedirect(req.getContextPath() + "/pedidos.jsp?error=delete_failed");
                return;
            }
        }
    }    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        System.out.println("Accion recibida en controller: " + action);
        
        if ("add".equals(action)) { // 1) AGREGAR AL CARRITO (NO BD)
            HttpSession session = request.getSession();

            // Recuperar el carrito de la sesión
            List<DetallePedido> carrito = (List<DetallePedido>) session.getAttribute("carrito_compra");
            if (carrito == null) { // Si no existe aún, se crea
                carrito = new ArrayList<>();
            }

            DetallePedido d = new DetallePedido();
            d.setId_producto(Integer.parseInt(request.getParameter("id_producto")));
            d.setCantidad(Integer.parseInt(request.getParameter("cantidad")));
            d.setP_venta(Float.parseFloat(request.getParameter("p_unitario")));
            carrito.add(d);

            session.setAttribute("carrito_compra", carrito); // Guardar carrito actualizado
            response.sendRedirect("pedidos.jsp?modal=open");
            return;
        }

        if ("create".equals(action)) {
            int idPedido = Integer.parseInt(request.getParameter("id_compra"));

            HttpSession session = request.getSession();
            List<DetallePedido> carrito = (List<DetallePedido>) session.getAttribute("carrito_compra");

            if (carrito != null) {
                for (DetallePedido d : carrito) {
                    d.setId_pedido(idPedido);
                    dao.insertar_detalle_pedido(d);
                }

                session.removeAttribute("carrito_compra");
            }
            response.sendRedirect("PedidoController");
        }

        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            dao.eliminar_detalle_pedido(id);
            response.sendRedirect("PedidoController");
        }
    }   
}
