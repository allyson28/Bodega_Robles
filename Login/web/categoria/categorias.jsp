<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%@page import="java.util.List"%>
<%@page import="model.Categoria"%>
<%@page import="dao.CategoriaDao"%>
<%@page import="daoimpl.CategoriaDaoImpl"%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>CATEGORIAS</title>
    </head>
    <body>
        <h1>Listado de categorías</h1>

        <!-- Botón para crear -->
        <a href="<%= request.getContextPath() %>/categoria/crear_categoria.jsp">➕ Crear categoría</a><br><br>

        <%
            CategoriaDao dao = new CategoriaDaoImpl();
            List<Categoria> lista = dao.obtener_categorias();
        %>

        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th colspan="2">Acciones</th>
            </tr>

            <%
                for (Categoria c : lista) {
            %>
            <tr>
                <td><%= c.getId_categoria() %></td>
                <td><%= c.getNombre() %></td>
                <td><%= c.getDescripcion() %></td>

                <!-- 🔵 1. BOTÓN EDITAR (GET) -->
                <td>
                    <a href="CategoriaController?action=edit&id=<%= c.getId_categoria() %>">
                        ✏ Editar
                    </a>
                </td>

                <!-- 🔴 2. BOTÓN ELIMINAR (POST) -->
                <td>
                    <form action="CategoriaController" method="post" style="display:inline;">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="id" value="<%= c.getId_categoria() %>">
                        <button type="submit">🗑 Eliminar</button>
                    </form>
                </td>
            </tr>
            <% } %>

        </table>
    </body>
</html>
