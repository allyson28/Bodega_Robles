<%@page import="model.Rol"%>
<%@page import="model.Usuario"%>
<%@page import="daoimpl.RolDaoImpl"%>
<%@page import="dao.RolDao"%>
<%@page import="daoimpl.UsuarioDaoImpl"%>
<%@page import="dao.UsuarioDao"%>
<%@page import="model.Proveedor"%>
<%@page import="java.util.List"%>
<%@page import="daoimpl.ProveedorDaoImpl"%>
<%@page import="dao.ProveedorDao"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>PRODUCTOS</title>

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
            width: 450px;
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
                <button class="boton-cerrar" onclick="cerrarSesion()" >Cerrar Sesión</button>
            </div>
        </aside>

    <!-- ------------------------ CONTENIDO PRINCIPAL ------------------------ -->
    <main class="contenido-principal">
        <h1 class="titulo-contenido">Gestión de proveedores</h1>

        <div class="seccion-filtros">
            <button class="btn-crear-item" id="boton-crear-producto">Registrar proveedor</button>
            <input type="text" id="buscarItem" placeholder="Buscar por nombre..." class="input-buscar">
        </div>

        <!-- ------------------------ TABLA ------------------------ -->
        <div class="contenedor-tabla">
            <%
                ProveedorDao dao = new ProveedorDaoImpl();
                List<Proveedor> lista = dao.obtener_proveedores();
            %>

            <table class="tabla-datos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RUC</th>
                        <th>Razon Social</th>
                        <th>Nombre Comercial</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th colspan="2">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <%
                        for (Proveedor p : lista) {
                    %>
                    <tr>
                        <td><%= p.getId_proveedor() %></td>
                        <td><%= p.getRuc() %></td>
                        <td><%= p.getRazon_social() %></td>
                        <td><%= p.getNombre_comercial() %></td>
                        <td><%= p.getDireccion() %></td>
                        <td><%= p.getTelefono() %></td>
                        <td><%= p.getEmail() %></td>

                        <!-- EDITAR -->
                        <td>
                            <button class="btn-editar"data-id="<%= p.getId_proveedor() %>">Editar</button>
                        </td>

                        <!-- ELIMINAR -->
                        <td>
                            <button class="btn-eliminar" data-id="<%= p.getId_proveedor() %>">Eliminar</button>
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
            <h2 id="modal-titulo">Rgistro de proveedores</h2>

            <form id="formulario-item" action="<%= request.getContextPath() %>/ProveedorController" method="post">          
                <input type="hidden" name="action" id="action" value="create">
                <input type="hidden" name="id" id="id_item">

                RUC: <br>
                <input type="text" id="ruc" name="ruc" required><br><br>

                Razon social: <br>
                <input type="text" id="razon_social" name="razon_social" required><br><br>

                Nombre comercial: <br>
                <input type="text" id="nombre_comercial" name="nombre_comercial"><br><br>

                Dirección: <br>
                <input type="text" id="direccion" name="direccion"><br><br>

                Telefono: <br>
                <input type="text" id="telefono" name="telefono"><br><br>

                Correo: <br>
                <input type="email" id="email" name="email"><br><br>

                <button type="submit" class="boton-guardar" >Registrar</button>
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
        
        function cerrarSesion() {
            if(confirm('¿Estás seguro que deseas cerrar sesión?')) {
                window.location.href = '<%= request.getContextPath() %>/LogoutServlet';
            }
        }
        
        /* === ABRIR MODAL CREAR === */
        document.getElementById("boton-crear-producto").addEventListener("click", () => {
            document.getElementById("modal-titulo").innerText = "Registro de proveedor";
            document.getElementById("action").value = "create";
            document.getElementById("id_item").value = "";
            document.getElementById("formulario-item").reset();
            document.getElementById("modal-item").style.display = "flex";
        });

        /* === ABRIR MODAL EDITAR === */
        document.querySelectorAll(".btn-editar").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;

                url_editar = contextPath + '/ProveedorController?action=get&id=' + encodeURIComponent(id);
                const res = await fetch(url_editar);
                if (!res.ok) {
                    console.error('Error en la petición:', res.status);
                    console.log('Respuesta texto:', await res.text());
                    return;
                }

                try {
                    const p = await res.json();
                    document.getElementById("modal-titulo").innerText = "Editar proveedor";
                    document.getElementById("action").value = "update";
                    document.getElementById("id_item").value = p.id_proveedor;

                    document.getElementById("ruc").value = p.ruc;
                    document.getElementById("razon_social").value = p.razon_social;
                    document.getElementById("nombre_comercial").value = p.nombre_comercial;
                    document.getElementById("direccion").value = p.direccion;
                    document.getElementById("telefono").value = p.telefono;
                    document.getElementById("email").value = p.email;

                    document.getElementById("modal-item").style.display = "flex";
                } catch (error) {
                    console.error('Error parseando JSON:', error);
                }
            });
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
                    const url_eliminar = contextPath + '/ProveedorController?action=delete&id=' + encodeURIComponent(idEliminar);
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