<%@page import="model.Rol"%>
<%@page import="daoimpl.RolDaoImpl"%>
<%@page import="dao.RolDao"%>
<%@page import="model.Usuario"%>
<%@page import="model.Producto"%>
<%@page import="model.Pedido"%>
<%@page import="daoimpl.UsuarioDaoImpl"%>
<%@page import="dao.UsuarioDao"%>
<%@page import="daoimpl.ProductoDaoImpl"%>
<%@page import="dao.ProductoDao"%>
<%@page import="model.DetallePedido"%>
<%@page import="daoimpl.DetallePedidoDaoImpl"%>
<%@page import="dao.DetallePedidoDao"%>
<%@page import="daoimpl.PedidoDaoImpl"%>
<%@page import="dao.PedidoDao"%>
<%@page import="model.Categoria"%>
<%@page import="java.util.List"%>
<%@page import="java.util.List"%>
<%@page import="daoimpl.CategoriaDaoImpl"%>
<%@page import="dao.CategoriaDao"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%// Verificar si debe abrir el modal automáticamente
    String modalParam = request.getParameter("modal");
    boolean abrirModal = "open".equals(modalParam);
%>
<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>PEDIDOS</title>

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">


    <!-- ------------------------ CONTENIDO PRINCIPAL ------------------------ -->
    <main class="contenido-principal">
        <h1 class="titulo-contenido">Gestión de Pedidos</h1>

        <div class="seccion-filtros">
            <button class="btn-crear-item" id="boton-crear-producto">Registrar nuevo pedido</button>
            <input type="text" id="buscarItem" placeholder="Buscar por nombre..." class="input-buscar">
            
            <% 
                CategoriaDao daoCat = new CategoriaDaoImpl();
                List<Categoria> categoriasX = daoCat.obtener_categorias();
            %>
            <select id="filtroCategoria" class="select-filtro">
                <option value="">Filtrar por categoría</option>
                <% for (Categoria categoria : categoriasX) { %>
                    <option value="<%= categoria.getId_categoria() %>">
                        <%= categoria.getNombre() %>
                    </option>
                <% } %>
            </select> 
        </div>

        <!-- ------------------------ TABLA ------------------------ -->
        <div class="contenedor-tabla">
            <%
                PedidoDao dao = new PedidoDaoImpl();
                DetallePedidoDao detalle_pedido_dao = new DetallePedidoDaoImpl();
                List<DetallePedido> detalle_pedidos = detalle_pedido_dao.obtener_detalle_pedidos();
                ProductoDao dao_prod = new ProductoDaoImpl();
                CategoriaDao dao_cat = new CategoriaDaoImpl();
            %>

            <table class="tabla-datos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Sub-total</th>
                        <th>Usuario</th>
                        <th>Accion</th>
                    </tr>
                </thead>

                <tbody>
                    <%
                    for (DetallePedido detalle : detalle_pedidos) {
                        Pedido pedido = dao.obtener_pedido_por_id(detalle.getId_pedido());
                        Producto producto = dao_prod.obtener_producto_por_id(detalle.getId_producto());
                        Categoria cat = dao_cat.obtener_categoria_por_id(producto.getId_producto());
                        Usuario usuario = dao_usuario.obtener_usuario_por_id(pedido.getId_usuario());
                    %>
                    <tr>
                        <td><%= detalle.getId_pedido_detalle() %></td>
                        <td><%= pedido.getFecha_registro() %></td>
                        <td><%= producto.getNombre() %></td>
                        <td><%= cat.getNombre() %></td>
                        <td><%= producto.getMarca() %></td>
                        <td><%= detalle.getCantidad() %></td>
                        <td><%= detalle.getP_venta() %></td>
                        <td><%= detalle.getSubtotal() %></td>
                        <td><%= usuario.getNombres() %></td>
                        
                        <td>
                            <button class="btn-eliminar" data-id="<%= detalle.getId_pedido_detalle() %>">Eliminar</button>
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
        </div>
    </main>

    <div id="modal-item" class="modal-superposicion">
        <div class="modal-contenido">
            <span class="modal-cerrar">&times;</span>
            <h2 id="modal-titulo">Registro de pedido</h2>

            <!-- FORMULARIO PARA AGREGAR PRODUCTOS -->
            <form action="<%= request.getContextPath() %>/DetallePedidoController" method="post">
                <input type="hidden" name="action" id="action" value="add">
                <input type="hidden" name="id" id="id_item">
                <%
                    ProductoDao dao_producto = new ProductoDaoImpl();
                    List<Producto> productos = dao_producto.obtener_productos();
                    CategoriaDao dao_categoria = new CategoriaDaoImpl();
                %>

                Producto: <br>
                <select name="id_producto" required>
                    <option value="">Seleccione...</option>
                    <% for (Producto p : productos) { %>
                        <option value="<%= p.getId_producto() %>"><%= p.getNombre() %></option>
                    <% } %>
                </select>
                <br><br>

                Cantidad:<br>
                <input type="number" id="cantidad" name="cantidad" min="1" required>
                <br><br>

                Precio Unitario:<br>
                <input type="number" id="p_unitario" name="p_unitario" min="0" required>
                <br><br>

                <button type="submit" class="boton-guardar" >Agregar</button>
            </form>

            <hr>

            <!-- TABLA DE PRODUCTOS AGREGADOS -->
            <h2>Productos del pedido</h2>
            <%
                List<DetallePedido> carrito = (List<DetallePedido>) session.getAttribute("carrito_compra");
                if (carrito != null && !carrito.isEmpty()) {
            %>

            <table class="tabla-datos">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Sub-total</th>
                        <th colspan="2">Acciones</th>
                    </tr>                    
                </thead>
                
                <tbody>
                    <% for (DetallePedido d : carrito) { %>
                        <%    
                        Producto producto = dao_producto.obtener_producto_por_id(d.getId_producto());
                        Categoria categoria = dao_categoria.obtener_categoria_por_id(producto.getId_categoria());
                        %>
                        <tr>

                            <td><%= producto.getNombre() %></td>
                            <td><%= categoria.getNombre() %></td>
                            <td><%= producto.getMarca() %></td>
                            <td><%= d.getCantidad() %></td>
                            <td><%= d.getP_venta() %></td>
                            <td><%= d.getCantidad() * d.getP_venta() %></td>
                        </tr>
                    <% } %>
                </tbody>
            </table>

            <% } else { %>
                <p>No hay productos agregados.</p>
            <% } %>

            <hr>

            <!-- FORMULARIO PARA CREAR LA COMPRA FINAL -->
            <form action="<%= request.getContextPath() %>/PedidoController" method="post">
                <input type="hidden" name="action" id="action" value="create">
                <input type="hidden" name="id" id="id_item">

                Dirección:<br>
                <input type="text" id="direccion" name="direccion"><br><br>

                <button type="submit" class="boton-guardar" >Registrar Pedido</button>
            </form>
        </div>
    </div>

    <div id="modal-eliminar" class="modal-superposicion">
        <div class="modal-contenido">
            <span class="modal-cerrar">&times;</span>
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este item? Esta acción no se puede deshacer.</p>
            <div class="modal-eliminar-botones">
                <button class="boton-modal-cancelar">Cancelar</button>
                <button class="boton-modal-eliminar">Eliminar</button>
            </div>
        </div>
    </div>
