package controller;

import dao.DetallePedidoDao;
import dao.PedidoDao;
import daoimpl.DetallePedidoDaoImpl;
import daoimpl.PedidoDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import model.DetallePedido;
import model.Pedido;
import model.Usuario;

@WebServlet(name="PedidoController", urlPatterns={"/PedidoController"})
public class PedidoController extends HttpServlet {
    PedidoDao pedidoDao = new PedidoDaoImpl();
    DetallePedidoDao detalleDao = new DetallePedidoDaoImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        if ("edit".equals(action)) { // MOSTRAR FORMULARIO DE EDICIÓN
            int id = Integer.parseInt(req.getParameter("id_pedido"));
            Pedido pedido = pedidoDao.obtener_pedido_por_id(id);
            req.setAttribute("pedido", pedido);
            req.getRequestDispatcher("pedido/editar_pedido.jsp").forward(req, resp);
            return;
        }
        // LISTAR
        req.setAttribute("pedidos", pedidoDao.obtener_pedidos());
        req.getRequestDispatcher("pedidos.jsp").forward(req, resp);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("create".equals(action)) {
            HttpSession session = request.getSession();
            
            Usuario usuario = (Usuario) session.getAttribute("usuario");
            if (usuario == null) {
                response.sendRedirect("Login.jsp");
                return;
            }
            
            List<DetallePedido> carrito = (List<DetallePedido>) session.getAttribute("carrito_compra"); // Obtener el carrito de la sesión

            if (carrito == null || carrito.isEmpty()) { // No hay detalles → no se puede crear compra
                response.sendRedirect("pedidos.jsp?modal=open");
                return;
            }

            // Preparar objeto Compra
            Pedido pedido = new Pedido();
            pedido.setId_usuario(usuario.getId_usuario());

            // Calcular total
            float total = 0;
            for (DetallePedido d : carrito) {
                total += d.getSubtotal();
            }
            pedido.setTotal(total);
            
            pedido.setDireccion_entrega(request.getParameter("direccion_entrega"));

            //Insertar compra y obtener ID generado
            int idCompraGenerado = pedidoDao.insertar_pedido(pedido);

            //Insertar detalles usando ese id_compra
            for (DetallePedido d : carrito) {
                d.setId_pedido(idCompraGenerado);
                detalleDao.insertar_detalle_pedido(d);
            }

            // 4. Limpiar carrito
            session.removeAttribute("carrito_compra");

            // 5. Redirigir a lista
            response.sendRedirect("PedidoController");
        }

        // -------- UPDATE --------
        if ("update".equals(action)) {
            Pedido p = new Pedido();

            p.setId_pedido(Integer.parseInt(request.getParameter("id_pedido")));
            p.setId_usuario(Integer.parseInt(request.getParameter("id_usuario")));
            p.setTotal(Float.parseFloat(request.getParameter("total")));
            p.setDireccion_entrega(request.getParameter("direccion_entrega"));

            //pedidoDao.actualizar_pedido(p);
            response.sendRedirect("PedidoController");
        }

        // -------- DELETE --------
        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            pedidoDao.eliminar_pedido(id);
            response.sendRedirect("PedidoController");
        }
    }    
}
