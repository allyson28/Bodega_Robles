<%@ page import="java.util.*, Entidades.Carrito" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    int i = Integer.parseInt(request.getParameter("i"));
    List<Map<String, Object>> historial = 
        (List<Map<String, Object>>) session.getAttribute("historial");

    Map<String, Object> h = historial.get(i);
    List<Carrito> productos = (List<Carrito>) h.get("productos");
%>

<div class="card shadow-sm p-3">
    <h4>Detalle de compra - S/ <%= h.get("total") %></h4>
    <p>Método: <%= h.get("metodo") %></p>
    <p>Fecha: <%= h.get("fecha") %></p>

    <ul class="list-group mt-3">
    <% for (Carrito c : productos) { %>
        <li class="list-group-item">
            <%= c.getNombre() %> - x<%= c.getCantidad() %>  
            <span class="float-end">S/ <%= c.getSubtotal() %></span>
        </li>
    <% } %>
    </ul>
</div>
