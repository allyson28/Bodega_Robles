
<%
    String base = request.getContextPath(); // /Login
%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>



<nav class="navbar navbar-expand-lg navbar-dark bg-success px-4">
    <a class="navbar-brand fw-bold" href="<%= base %>/TiendaServlet">
        Minimarket Los Robles 🛒
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">

            <li class="nav-item">
                <a class="nav-link" href="<%= base %>/TiendaServlet">Tienda</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="<%= base %>/CarritoServlet?accion=ver">Carrito 🛍️</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="<%= base %>/HistorialComprasServlet">Historial</a>
            </li>

            <li class="nav-item">
                <a class="btn btn-light ms-3" href="<%= base %>/LogoutServlet">Cerrar Sesión</a>
            </li>

        </ul>
    </div>
</nav>


<link rel="stylesheet" 
href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
