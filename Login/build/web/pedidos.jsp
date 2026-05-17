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

    <style>
        /* ------------------------ GENERALES ------------------------ */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #eef1f4;
        }

        .contenedor-principal {
            display: flex;
            min-height: 100vh;
        }

        /* ------------------------ MENU LATERAL ------------------------ */
        .menu-lateral {
            position: fixed;
            top: 0; left: 0;
            height: 100vh;
            width: 260px;
            background: #ffffff;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            padding-bottom: 20px;
        }

        .encabezado-negocio {
            display: flex; 
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
            gap: 10px;
        }

        .nombre-negocio {
            font-size: 16px;
            font-weight: 600;
            color: #222;
        }

        .seccion-usuario {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }

        .foto-usuario {
            width: 45px; height: 45px;
            border-radius: 50%;
            background: #27ae60;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 18px;
        }

        .nombre-usuario { font-weight: 600; color: #222; }
        .rol-usuario { font-size: 13px; color: #777; }

        /* NAV */
        .navegacion { padding-top: 20px; }

        .boton-menu {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            margin: 5px 10px;
            border-radius: 8px;
            color: #333;
            font-weight: 500;
            text-decoration: none;
            transition: 0.2s ease;
        }

        .boton-menu:hover,
        .boton-menu.activo {
            background: #e8f5e9;
            color: #27ae60;
        }

        .seccion-cerrar {
            padding: 20px;
        }

        .boton-cerrar {
            width: 100%;
            background: #e74c3c;
            border: none;
            padding: 12px;
            color: white;
            font-size: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.2s ease;
        }

        .boton-cerrar:hover {
            background: #c0392b;
        }

        /* ------------------------ CONTENIDO ------------------------ */
        .contenido-principal {
            margin-left: 260px;
            padding: 30px;
            width: calc(100% - 260px);
        }

        .titulo-contenido {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 25px;
            color: #2c3e50;
        }

        /* ------------------------ FILTROS ------------------------ */
        .seccion-filtros {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 25px;
        }

        .input-buscar, .select-filtro {
            padding: 10px 15px;
            border: 2px solid #dadada;
            border-radius: 8px;
            font-size: 14px;
            width: 200px;
        }

        .btn-crear-item {
            background: #27ae60;
            color: white;
            padding: 11px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        /* ------------------------ TABLA ------------------------ */
        .contenedor-tabla {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .tabla-datos {
            width: 100%;
            border-collapse: collapse;
        }

        .tabla-datos thead {
            background: #27ae60;
            color: white;
        }

        .tabla-datos th {
            padding: 14px;
            text-align: left;
            font-size: 13px;
            text-transform: uppercase;
        }

        .tabla-datos td {
            padding: 12px;
            font-size: 14px;
            color: #333;
        }

        .tabla-datos tr:nth-child(even) {
            background: #f8f8f8;
        }

        .btn-editar, .btn-eliminar {
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
        }

        .btn-editar { background: #3498db; color: white; }
        .btn-eliminar { background: #e74c3c; color: white; }

        /* ------------------------ MODAL ------------------------ */
        .modal-superposicion {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.45);
            display: none;
            align-items: center;
            justify-content: center;
        }

        .modal-contenido {
            background: white;
            padding: 25px;
            width: 700px;
            border-radius: 14px;
        }

        .modal-contenido h2 {
            margin-bottom: 15px;
        }

        .modal-contenido label {
            font-weight: 600;
            margin-top: 10px;
        }

        .modal-contenido input, select {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 8px;
            margin-top: 5px;
        }

        .boton-guardar {
            margin-top: 15px;
            width: 100%;
            padding: 12px;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
        }

    </style>
</head>

<body>
    <div class="contenedor-principal">
        <%
            UsuarioDao dao_usuario = new UsuarioDaoImpl();
            RolDao dao_rol = new RolDaoImpl();
            HttpSession sessionCompra = request.getSession(false); // Obtener usuario de la sesión
            
            Usuario usuario_session = null;
            Rol rol = null;
            if (sessionCompra != null) {
                usuario_session = (Usuario) sessionCompra.getAttribute("usuario");
                System.out.println("Usuario recuperado: " + usuario_session.getNombres());
                if (usuario_session != null) {
                    rol = dao_rol.obtener_rol_por_id(usuario_session.getId_rol());
                }
            }
        %> 
        <!-- ------------------------ MENU ------------------------ -->
        <aside class="menu-lateral">
            <div class="encabezado-negocio">
                <img src="imagenes/Logo.png" width="48px">
                <div class="nombre-negocio">Minimarket<br>Los Robles</div>
            </div>

            <div class="seccion-usuario">
                <div class="foto-usuario">
                    <!-- Mostrar iniciales del nombre -->
                    <%= (usuario_session != null && usuario_session.getNombres() != null && !usuario_session.getNombres().isEmpty()) 
                        ? usuario_session.getNombres().charAt(0) 
                        : "U" %>
                </div>
                <div>
                    <div class="nombre-usuario"><!-- Verificar que usuario_session no sea null -->
                        <%= (usuario_session != null) ? usuario_session.getNombres() : "Usuario" %>
                    </div>
                    <div class="rol-usuario">
                        <!-- Verificar que rol no sea null -->
                        <%= (rol != null) ? rol.getRol() : "Sin rol asignado" %>
                    </div>
                </div>
            </div>

            <nav class="navegacion">
                <a href="reportes.jsp" class="boton-menu">
                    <img src="imagenes/reportes.png" width="26px">
                    Reportes
                </a>

                <a href="abastecimiento.jsp" class="boton-menu">
                    <img src="imagenes/abastecimiento.png" width="26px">
                    Abastecimiento
                </a>

                <a href="pedidos.jsp" class="boton-menu">
                    <img src="imagenes/ventas.png" width="26px">
                    Pedidos
                </a>

                <a href="productos.jsp" class="boton-menu activo">
                    <img src="imagenes/producto.png" width="26px">
                    Inventario
                </a>

                <a href="proveedores.jsp" class="boton-menu activo">
                    <img src="imagenes/producto.png" width="26px">
                    Proveedores
                </a>

                <a href="usuarios.jsp" class="boton-menu">
                    <img src="imagenes/Empleados.png" width="26px">
                    Usuarios
                </a>
            </nav>

            <div class="seccion-cerrar">
                <button class="boton-cerrar" onclick="cerrarSesion()">Cerrar Sesión</button>
            </div>
        </aside>

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
    </div>

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

    <script>
        const contextPath = '<%= request.getContextPath() %>';
        // Abrir modal automáticamente si viene con parámetro
        window.addEventListener('DOMContentLoaded', function() {
            <% if (abrirModal) { %>
                document.getElementById("modal-item").style.display = "flex";
            <% } %>
        });

        function cerrarSesion() {
            if(confirm('¿Estás seguro que deseas cerrar sesión?')) {
                window.location.href = '<%= request.getContextPath() %>/LogoutServlet';
            }
        }

        /* === ABRIR MODAL CREAR === */
        document.getElementById("boton-crear-producto").addEventListener("click", () => {
            document.getElementById("modal-item").style.display = "flex";
        });

        /* === ABRIR MODAL ELIMINAR === */
        let idEliminar = null;
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", () => {
                idEliminar = btn.dataset.id;
                console.log("ID a eliminar capturado:", idEliminar);
                document.getElementById("modal-eliminar").style.display = "flex";
            });
        });

        /* === CONFIRMAR ELIMINACIÓN === */
        const btnEliminarConfirmar = document.querySelector(".boton-modal-eliminar");
        if (btnEliminarConfirmar) {
            btnEliminarConfirmar.addEventListener("click", () => {
                console.log('ID a eliminar confirmado:', idEliminar);
                if (idEliminar) {
                    const url_eliminar = contextPath + '/DetallePedidoController?action=delete&id=' + encodeURIComponent(idEliminar);
                    console.log('URL de eliminación:', url_eliminar);
                    window.location.href = url_eliminar;
                } else {
                    console.error('ID de eliminación no definido');
                    alert('Error: No se especificó qué producto eliminar');
                }
            });
        } else {
            console.error('Botón de confirmar eliminación no encontrado');
        }

        /* === CANCELAR ELIMINACIÓN === */
        document.querySelector(".boton-modal-cancelar")?.addEventListener("click", () => {
            document.getElementById("modal-eliminar").style.display = "none";
        });

        /* === CERRAR MODALES === */
        document.querySelectorAll(".modal-cerrar").forEach(btn => {
            btn.addEventListener("click", () => {
                document.getElementById("modal-item").style.display = "none";
                document.getElementById("modal-eliminar").style.display = "none";
            });
        });

        // Cerrar modal al hacer clic fuera
        document.querySelectorAll('.modal-superposicion').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>