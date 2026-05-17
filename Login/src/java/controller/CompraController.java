package controller;

import dao.CompraDao;
import dao.DetalleCompraDao;
import daoimpl.CompraDaoImpl;
import daoimpl.DetalleCompraDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import model.Compra;
import model.DetalleCompra;
import model.Usuario;

@WebServlet(name="CompraController", urlPatterns={"/CompraController"})
public class CompraController extends HttpServlet {
    CompraDao compraDao = new CompraDaoImpl();
    DetalleCompraDao detalleDao = new DetalleCompraDaoImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        if ("edit".equals(action)) { // MOSTRAR FORMULARIO DE EDICIÓN
            int id = Integer.parseInt(req.getParameter("id_compra"));
            Compra compra = compraDao.obtener_compra_por_id(id);
            req.setAttribute("compra", compra);
            req.getRequestDispatcher("compra/editar_compra.jsp").forward(req, resp);
            return;
        }
        // LISTAR
        req.setAttribute("compras", compraDao.obtener_compras());
        req.getRequestDispatcher("abastecimiento.jsp").forward(req, resp);
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
            
            // Obtener el carrito de la sesión
            List<DetalleCompra> carrito = (List<DetalleCompra>) session.getAttribute("carrito_compra");

            if (carrito == null || carrito.isEmpty()) { // No hay detalles → no se puede crear compra
                response.sendRedirect("abastecimiento.jsp?modal=open");
                return;
            }

            // Preparar objeto Compra
            Compra compra = new Compra();
            compra.setId_proveedor(Integer.parseInt(request.getParameter("id_proveedor")));

            // Si tienes login en sesión úsalo. Si no, pon 1 temporalmente.
            compra.setId_usuario(usuario.getId_usuario());

            // Calcular total
            float total = 0;
            for (DetalleCompra d : carrito) {
                total += d.getSubtotal();
            }
            compra.setTotal(total);

            compra.setGuia_remision(request.getParameter("guia_remision"));

            // Insertar compra y obtener ID generado
            int idCompraGenerado = compraDao.insertar_compra(compra);

            // Insertar detalles usando ese id_compra
            for (DetalleCompra d : carrito) {
                d.setId_compra(idCompraGenerado);
                detalleDao.insertar_detalle_compra(d);
            }

            // Limpiar carrito
            session.removeAttribute("carrito_compra");

            // Redirigir a lista
            response.sendRedirect("CompraController");
        }

        // -------- UPDATE --------
        if ("update".equals(action)) {
            Compra c = new Compra();

            c.setId_compra(Integer.parseInt(request.getParameter("id_compra")));
            c.setId_proveedor(Integer.parseInt(request.getParameter("id_proveedor")));
            c.setGuia_remision(request.getParameter("guia_remision"));
            c.setTotal(Float.parseFloat(request.getParameter("total")));

            compraDao.actualizar_compra(c);

            response.sendRedirect("CompraController");
        }

        // -------- DELETE --------
        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            compraDao.eliminar_compra(id);
            response.sendRedirect("CompraController");
        }
    }
}
