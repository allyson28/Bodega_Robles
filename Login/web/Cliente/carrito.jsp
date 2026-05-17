<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="navbarCliente.jsp" %>
<%@ page import="java.util.List" %>
<%@ page import="Entidades.Carrito" %>

<%
    List<Carrito> carrito = (List<Carrito>) session.getAttribute("carrito");
    double total = 0;
    if (carrito != null) {
        for (Carrito c : carrito) total += c.getSubtotal();
    }
%>

<div class="container mt-4">

    <h3 class="fw-bold mb-3">🛍️ Carrito de Compras</h3>

    <table class="table table-striped">
        <thead class="table-success">
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cant.</th>
                <th>Subtotal</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
        <% if (carrito != null) {
               for (Carrito c : carrito) {
        %>
            <tr>
                <td><%= c.getNombre() %></td>
                <td>S/ <%= c.getPrecio() %></td>

                <td>
                    <form action="${pageContext.request.contextPath}/CarritoServlet" 
                          method="post" class="d-flex">

                        <input type="hidden" name="accion" value="actualizar">
                        <input type="hidden" name="id" value="<%= c.getIdProducto() %>">

                        <input type="number" name="cantidad" min="1"
                               value="<%= c.getCantidad() %>"
                               class="form-control w-50 me-2">

                        <button class="btn btn-primary btn-sm">OK</button>
                    </form>
                </td>

                <td>S/ <%= c.getSubtotal() %></td>

                <td>
                    <a href="${pageContext.request.contextPath}/CarritoServlet?accion=eliminar&id=<%= c.getIdProducto() %>"
                       class="btn btn-danger btn-sm">X</a>
                </td>
            </tr>
        <% }} %>
        </tbody>
    </table>

    <div class="text-end">
        <h4>Total: S/ <%= total %></h4>

        <a href="${pageContext.request.contextPath}/CarritoServlet?accion=vaciar" 
           class="btn btn-outline-danger">Vaciar</a>

        <a href="${pageContext.request.contextPath}/Cliente/checkout.jsp" 
           class="btn btn-success btn-lg">Proceder al Pago</a>
    </div>
</div>
