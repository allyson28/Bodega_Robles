
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, Entidades.Carrito" %>

<h2 class="text-center mt-4">🛒 Historial de Compras</h2>

<div class="container mt-4">
<table class="table table-bordered table-hover">
    <thead class="table-success">
        <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Método</th>
            <th>Total</th>
            <th>Detalle</th>
        </tr>
    </thead>

    <tbody>
        <%
            List<Map<String, Object>> historial = 
                (List<Map<String, Object>>) session.getAttribute("historial");

            if (historial != null) {
                int index = 1;
                for (Map<String, Object> h : historial) {
        %>
        <tr>
            <td><%= index++ %></td>
            <td><%= h.get("fecha") %></td>
            <td><%= h.get("metodo") %></td>
            <td>S/ <%= h.get("total") %></td>
            <td>
                <button class="btn btn-primary btn-sm" 
                        onclick="mostrarDetalle(<%= historial.indexOf(h) %>)">
                    Ver
                </button>
            </td>
        </tr>
        <% 
                }
            }
        %>
    </tbody>
</table>

<div id="detalle" class="mt-4"></div>

<script>
function mostrarDetalle(i) {
    fetch("detalleHistorial.jsp?i=" + i)
        .then(r => r.text())
        .then(html => document.getElementById("detalle").innerHTML = html);
}
</script>
</div>
