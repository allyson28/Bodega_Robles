<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="navbarCliente.jsp" %>
<%@ page import="Entidades.Carrito" %>
<%@ page import="java.util.List" %>

<%
    List<Carrito> carrito = (List<Carrito>) session.getAttribute("carrito");
    double total = 0;

    if (carrito != null) {
        for (Carrito c : carrito) total += c.getSubtotal();
    }
%>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container mt-4 mb-5">
    <h2 class="fw-bold mb-4 text-center">💳 Checkout - Finalizar Compra</h2>

    <div class="row g-4">

        <!-- RESUMEN DE COMPRA -->
        <div class="col-md-6">
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white fw-bold">🛍️ Resumen de la compra</div>

                <ul class="list-group list-group-flush">
                    <% if (carrito != null) {
                        for (Carrito c : carrito) { %>
                            <li class="list-group-item d-flex justify-content-between">
                                <span><%= c.getNombre() %> (x<%= c.getCantidad() %>)</span>
                                <span>S/ <%= c.getSubtotal() %></span>
                            </li>
                    <% }} %>
                </ul>

                <div class="p-3 text-end">
                    <h4>Total a pagar: <span class="text-success fw-bold">S/ <%= total %></span></h4>
                </div>
            </div>
        </div>



        <!-- MÉTODOS DE PAGO -->
        <div class="col-md-6">
            <form action="../PagoServlet" method="post" id="formPago">

                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white fw-bold">Seleccione método de pago</div>
                    <div class="card-body">

                        <select name="metodoPago" id="metodoPago" class="form-select mb-3" required>
                            <option value="">Seleccione...</option>
                            <option value="tarjeta">Tarjeta de Crédito / Débito</option>
                            <option value="yape">Yape</option>
                            <option value="plin">Plin</option>
                        </select>


                        <!-- FORM TARJETA -->
                        <div id="pagoTarjeta" class="mt-3" style="display:none;">
                            <h6 class="fw-bold">Datos de Tarjeta</h6>

                            <input type="text" maxlength="16" name="numTarjeta" placeholder="Número de tarjeta"
                                   class="form-control mb-2">

                            <div class="row">
                                <div class="col">
                                    <input type="text" maxlength="5" name="fecha" placeholder="MM/YY"
                                           class="form-control mb-2">
                                </div>
                                <div class="col">
                                    <input type="text" maxlength="3" name="cvv" placeholder="CVV"
                                           class="form-control mb-2">
                                </div>
                            </div>

                            <input type="text" name="titular" placeholder="Titular de la tarjeta"
                                   class="form-control mb-2">
                        </div>


                        <!-- FORM YAPE -->
                        <div id="pagoYape" class="mt-3" style="display:none;">
                            <h6 class="fw-bold">Pagar con Yape</h6>
                            <p>Escanea el siguiente QR o ingresa tu número.</p>

                            <img src="../imagenes/qr-yape.png" class="img-fluid mb-2" 
                                 style="max-width:180px;" alt="QR Yape">

                            <input type="text" name="yapeNum" placeholder="Número Yape"
                                   class="form-control mb-2">
                        </div>


                        <!-- FORM PLIN -->
                        <div id="pagoPlin" class="mt-3" style="display:none;">
                            <h6 class="fw-bold">Pagar con Plin</h6>
                            <p>Escanea el QR o ingresa tu número.</p>

                            <img src="../imagenes/qr-plin.png" class="img-fluid mb-2"
                                 style="max-width:180px;" alt="QR Plin">

                            <input type="text" name="plinNum" placeholder="Número Plin"
                                   class="form-control mb-2">
                        </div>

                        <button class="btn btn-success w-100 btn-lg mt-3">
                            Finalizar Compra
                        </button>

                    </div>
                </div>

            </form>
        </div>

    </div>
</div>

<script>
    // Mostrar campos según método seleccionado
    document.getElementById("metodoPago").addEventListener("change", function () {
        document.getElementById("pagoTarjeta").style.display = "none";
        document.getElementById("pagoYape").style.display = "none";
        document.getElementById("pagoPlin").style.display = "none";

        if (this.value === "tarjeta") {
            document.getElementById("pagoTarjeta").style.display = "block";
        }
        if (this.value === "yape") {
            document.getElementById("pagoYape").style.display = "block";
        }
        if (this.value === "plin") {
            document.getElementById("pagoPlin").style.display = "block";
        }
    });
</script>
