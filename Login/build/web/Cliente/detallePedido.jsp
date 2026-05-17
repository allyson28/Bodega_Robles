<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="navbarCliente.jsp" %>
<%@ page import="Entidades.Pedido" %>
<%@ page import="Entidades.DetallePedido" %>
<%@ page import="java.util.List" %>

<%
    Pedido pedido = (Pedido) request.getAttribute("pedido");
    List<DetallePedido> detalle = (List<DetallePedido>) request.getAttribute("detalle");
%>

<div class="container mt-4">

    <h3 class="fw-bold mb-3">📦 Detalle del Pedido #<%= pedido.getIdPedido() %></h3>

    <p><strong>Fecha:</strong>
        <%= new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(pedido.getFecha()) %>
    </p>

    <p><strong>Total pagado:</strong>
        <span class="text-success fw-bold">S/ <%= pedido.getTotal() %></span>
    </p>

    <div class="card shadow-sm mt-4">
        <div class="card-body">

            <table class="table table-bordered">
                <thead class="table-success">
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    <% for (DetallePedido d : detalle) { %>
                    <tr>
                        <td><%= d.getNombreProducto() %></td>
                        <td>S/ <%= d.getPrecio() %></td>
                        <td><%= d.getCantidad() %></td>
                        <td>S/ <%= d.getSubtotal() %></td>
                    </tr>
                    <% } %>
                </tbody>
            </table>

        </div>
    </div>

    <a href="${pageContext.request.contextPath}/HistorialComprasServlet"
       class="btn btn-outline-primary mt-3">⬅ Volver al Historial</a>

</div>
