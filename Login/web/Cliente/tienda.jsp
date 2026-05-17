<%-- 
    Document   : tienda
    Created on : 6 dic. 2025, 01:47:18
    Author     : User
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="model.Producto" %>
<%@ page import="model.Categoria" %>

<%@ include file="navbarCliente.jsp" %>

<div class="container-fluid mt-4">

    <div class="row">

        <!-- FILTROS -->
        <aside class="col-md-3">
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white fw-bold">Filtros</div>

                <form action="${pageContext.request.contextPath}/TiendaServlet" method="get" class="card-body">

                    <label class="form-label">Buscar:</label>
                    <input type="text" class="form-control mb-3" name="buscar" value="${buscar}" placeholder="Buscar producto…">

                    <label class="form-label">Categoría:</label>
                    <select name="categoria" class="form-select mb-3">
                        <option value="0">Todas</option>

                        <%
                            List<Categoria> categorias = (List<Categoria>) request.getAttribute("categorias");
                            if (categorias != null) {
                                for (Categoria c : categorias) {
                        %>
                            <option value="<%= c.getId_categoria() %>"
                                <%= (c.getId_categoria()+"").equals(request.getAttribute("categoria")) ? "selected" : "" %>>
                                <%= c.getNombre() %>
                            </option>
                        <% }} %>

                    </select>

                    <label class="form-label">Precio mínimo:</label>
                    <input type="number" name="precioMin" value="${precioMin}" class="form-control mb-3">

                    <label class="form-label">Precio máximo:</label>
                    <input type="number" name="precioMax" value="${precioMax}" class="form-control mb-3">

                    <label class="form-label">Ordenar por:</label>
                    <select name="ordenar" class="form-select mb-3">
                        <option value="">Sin orden</option>
                        <option value="precio_asc" ${ordenar=="precio_asc"?"selected":""}>Precio: menor a mayor</option>
                        <option value="precio_desc" ${ordenar=="precio_desc"?"selected":""}>Precio: mayor a menor</option>
                        <option value="nombre_asc" ${ordenar=="nombre_asc"?"selected":""}>Nombre A-Z</option>
                        <option value="nombre_desc" ${ordenar=="nombre_desc"?"selected":""}>Nombre Z-A</option>
                    </select>

                    <button class="btn btn-success w-100">Aplicar</button>

                </form>
            </div>
        </aside>

        <!-- PRODUCTOS -->
        <section class="col-md-9">

            <h3 class="fw-bold mb-3">Productos disponibles</h3>

            <div class="row g-4">
                <%
                    List<Producto> productos = (List<Producto>) request.getAttribute("lista");

                    if (productos != null && !productos.isEmpty()) {
                        for (Producto p : productos) {
                %>

                <div class="col-md-4">
                    <div class="card shadow-sm h-100">

                        <img src="${pageContext.request.contextPath}/imagenes/2.jpeg"
                             class="card-img-top"
                             style="height: 200px; object-fit: contain;"
                             alt="Imagen">

                        <div class="card-body">
                            <h5 class="card-title"><%= p.getNombre() %></h5>
                            <p class="text-muted small"><%= p.getId_categoria() %></p>
                            <p class="text-success fs-5 fw-bold">S/ <%= p.getId_categoria() %></p>
                        </div>

                        <div class="card-footer bg-white">
                            <form action="${pageContext.request.contextPath}/CarritoServlet" method="post">
                                <input type="hidden" name="accion" value="agregar">
                                <input type="hidden" name="id" value="<%= p.getId_producto() %>">

                                <button class="btn btn-success w-100">Agregar al Carrito</button>
                            </form>
                        </div>

                    </div>
                </div>

                <% }} else { %>
                <div class="alert alert-warning">No se encontraron productos.</div>
                <% } %>

            </div>

        </section>

    </div>

</div>
