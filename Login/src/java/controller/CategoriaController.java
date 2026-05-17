package controller;

import dao.CategoriaDao;
import daoimpl.CategoriaDaoImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import model.Categoria;

@WebServlet(name="CategoriaController", urlPatterns={"/CategoriaController"})
public class CategoriaController extends HttpServlet{
    CategoriaDao dao = new CategoriaDaoImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {      
        String action = req.getParameter("action");
        // MOSTRAR FORMULARIO DE EDICIÓN
        if ("edit".equals(action)) {
            int id = Integer.parseInt(req.getParameter("id"));
            Categoria categoria = dao.obtener_categoria_por_id(id);
            req.setAttribute("categoria", categoria);
            req.getRequestDispatcher("categoria/editar_categoria.jsp").forward(req, resp);
            return;
        }
        // LISTAR
        req.setAttribute("categorias", dao.obtener_categorias());
        req.getRequestDispatcher("categoria/categorias.jsp").forward(req, resp);
    } 

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("create".equals(action)) {
            Categoria c = new Categoria();
            c.setNombre(request.getParameter("nombre"));
            c.setDescripcion(request.getParameter("descripcion"));

            dao.insertar_categoria(c);
            response.sendRedirect("CategoriaController");
        }
        
        if ("update".equals(action)) {
            Categoria c = new Categoria();
            c.setId_categoria(Integer.parseInt(request.getParameter("id")));
            c.setNombre(request.getParameter("nombre"));
            c.setDescripcion(request.getParameter("descripcion"));

            dao.actualizar_categoria(c);
            response.sendRedirect("CategoriaController");
        }
        
        if ("delete".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            dao.eliminar_categoria(id);
            response.sendRedirect("CategoriaController");
        }
    }
}
