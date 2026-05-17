<%@ include file="navbarCliente.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<<div class="container mt-5 text-center">
    <h2 class="text-success fw-bold">✔ Pago realizado con éxito</h2>
    <p class="mt-3">Gracias por su compra</p>

    <a href="../ComprobantePDFServlet" class="btn btn-primary btn-lg mt-3">
        Descargar Comprobante PDF
    </a>

    <br><br>

    <a href="../TiendaServlet" class="btn btn-outline-success mt-2">
        Volver a la tienda
    </a>
</div>
