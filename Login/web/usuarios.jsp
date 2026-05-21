<%@page import="model.Rol"%>
<%@page import="model.Usuario"%>
<%@page import="daoimpl.RolDaoImpl"%>
<%@page import="dao.RolDao"%>
<%@page import="daoimpl.UsuarioDaoImpl"%>
<%@page import="dao.UsuarioDao"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel - Minimarket Los Robles</title>
    
    <style>
     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
.contenedor-principal { display: flex; min-height: 100vh; }
.menu-lateral { width: 260px; background: white; color: #27ae60; display: flex; flex-direction: column; box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); }
.encabezado-negocio { display: flex; align-items: center; padding: 20px; gap: 10px; border-bottom: 1px solid #eee; }
.nombre-negocio { font-weight: 600; font-size: 16px; line-height: 1.2; color: black; }
.seccion-usuario { padding: 15px 20px; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #e0e0e0; }
.foto-usuario { width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, #27ae60 0%, #229954 100%); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; color: white; }
.nombre-usuario { font-size: 15px; font-weight: 600; color: black; }
.rol-usuario { font-size: 13px; color: #7f8c8d; }
.navegacion { flex: 1; padding: 15px 0; overflow-y: auto; }
.boton-menu { display: flex; align-items: center; gap: 15px; padding: 12px 20px; margin: 4px 10px; color: #303030; text-decoration: none; transition: all 0.3s ease; border-radius: 8px; cursor: pointer; }
.boton-menu .icono { display: flex; align-items: center; opacity: 0.7; }
.boton-menu:hover, .boton-menu.activo { background-color: #e8f5e9; color: #27ae60; font-weight: 600; }
.boton-menu:hover .icono, .boton-menu.activo .icono { opacity: 1; }
.seccion-cerrar { padding: 20px; border-top: 1px solid #e0e0e0; }
.boton-cerrar { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 11px 16px; background-color: #a02809 ; color: white; border-radius: 8px; transition: all 0.3s ease; cursor: pointer; border: none; width: 100%; font-size: 15px; font-weight: 550; }
.boton-cerrar:hover { background-color: #861e04; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
.contenido-principal { flex: 1; padding: 30px; background-color: #f4f6f8; overflow-x: auto; }
.titulo-contenido { font-size: 28px; font-weight: 600; color: #333; margin-bottom: 25px; }
.barra-acciones { margin-bottom: 20px; }
.boton-crear { background-color: #557c3e; color: #fff; border: none; padding: 10px 15px; border-radius: 8px; font-size: 15px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.3s ease; }
.boton-crear:hover { background-color: #466834; }
.tabla-datos { width: 100%; border-collapse: collapse; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); }
.tabla-datos th, .tabla-datos td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
.tabla-datos thead { background-color: #f9f9f9; }
.tabla-datos th { font-size: 14px; font-weight: 600; color: #555; text-transform: uppercase; }
.tabla-datos tbody tr:hover { background-color: #f7f7f7; }
.celda-acciones { display: flex; gap: 10px; }
.boton-editar, .boton-eliminar { border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-size: 13px; font-weight: 500; color: #fff; transition: background-color 0.3s ease; }
.boton-editar { background-color: #f0ad4e; }
.boton-editar:hover { background-color: #ec971f; }
.boton-eliminar { background-color: #d9534f; }
.boton-eliminar:hover { background-color: #c9302c; }
.modal-superposicion { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); justify-content: center; align-items: center; }
.modal-contenido { background-color: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: 90%; max-width: 450px; position: relative; animation: aparecer 0.3s ease-out; }
@keyframes aparecer { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-cerrar { position: absolute; top: 10px; right: 15px; font-size: 28px; font-weight: bold; color: #aaa; cursor: pointer; }
.modal-cerrar:hover { color: #333; }
.modal-contenido h2 { margin-top: 0; margin-bottom: 20px; }
.modal-contenido p { margin-bottom: 20px; color: #555; }
.modal-contenido label { display: block; margin-bottom: 5px; font-weight: 500; color: #333; }
.modal-contenido input[type="text"] { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
.boton-guardar { width: 100%; padding: 12px; background-color: #557c3e; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
.boton-guardar:hover { background-color: #466834; }
.modal-eliminar-botones { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
.boton-modal-eliminar, .boton-modal-cancelar { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 600; }
.boton-modal-eliminar { background-color: #d9534f; color: white; }
.boton-modal-eliminar:hover { background-color: #c9302c; }
.boton-modal-cancelar { background-color: #eee; color: #333; }
.boton-modal-cancelar:hover { background-color: #ddd; }

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
        <aside class="menu-lateral">
            <div class="encabezado-negocio">
                <div class="Logo"> <img src="imagenes/Logo.png" width="50px"></div>
                <div class="nombre-negocio"> Minimarket <br>Los Robles</div>
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
                <button class="boton-cerrar" onclick="cerrarSesion()">
                    <span class="icono"><img src="imagenes/Cerrar_S.png" width="30px" style="filter: invert(1)"></span>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>

    <main class="contenido-principal">
        <h1 class="titulo-contenido">Gestión de Usuarios</h1>
        
        <div class="barra-acciones">
            <button class="boton-crear">
                <span class="icono-boton">➕</span>
                Crear Nuevo Usuario
            </button>
        </div>

        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>Rol de Usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>101</td>
                    <td>Ana García</td>
                    <td>Vendedor</td>
                    <td class="celda-acciones">
                        <button class="boton-editar">Editar</button>
                        <button class="boton-eliminar">Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>102</td>
                    <td>Juan Pérez</td>
                    <td>Administrador</td>
                    <td class="celda-acciones">
                        <button class="boton-editar">Editar</button>
                        <button class="boton-eliminar">Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>103</td>
                    <td>María López</td>
                    <td>Almacén</td>
                    <td class="celda-acciones">
                        <button class="boton-editar">Editar</button>
                        <button class="boton-eliminar">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>


    <div id="modal-usuario" class="modal-superposicion">
        <div class="modal-contenido">
            <span class="modal-cerrar">&times;</span>
            <h2 id="modal-titulo">Crear Usuario</h2>
            <form id="formulario-usuario">
                <input type="hidden" id="usuario-id">
                
                <label for="nombre">Nombre Completo:</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ej: Ana García" required>
                
                <label for="rol">Rol de Usuario:</label>
                <input type="text" id="rol" name="rol" placeholder="Ej: Vendedor" required>
                
                <button type="submit" class="boton-guardar">Guardar Cambios</button>
            </form>
        </div>
    </div>

    
    <div id="modal-eliminar" class="modal-superposicion">
        <div class="modal-contenido">
            <span class="modal-cerrar">&times;</span>
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.</p>
            <div class="modal-eliminar-botones">
                <button class="boton-modal-cancelar">Cancelar</button>
                <button class="boton-modal-eliminar">Eliminar</button>
            </div>
        </div>
    </div>

    <script>
    const botonesMenu = document.querySelectorAll('.boton-menu');
    
    botonesMenu.forEach(boton => {
        boton.addEventListener('click', function(e) {
            botonesMenu.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
        });
    });

    function cerrarSesion() {
        if(confirm('¿Estás seguro que deseas cerrar sesión?')) {
            window.location.href = '<%= request.getContextPath() %>/LogoutServlet';
        }
    }

    const modalUsuario = document.getElementById('modal-usuario');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalForm = document.getElementById('formulario-usuario');
    const inputId = document.getElementById('usuario-id');
    const inputNombre = document.getElementById('nombre');
    const inputRol = document.getElementById('rol');
    
    const botonCrear = document.querySelector('.boton-crear');
    const botonesCerrarModal = document.querySelectorAll('.modal-cerrar');
    const botonesEditar = document.querySelectorAll('.boton-editar');
    const botonesEliminar = document.querySelectorAll('.boton-eliminar');

    const modalEliminar = document.getElementById('modal-eliminar');
    const botonConfirmarEliminar = document.querySelector('.boton-modal-eliminar');
    const botonCancelarEliminar = document.querySelector('.boton-modal-cancelar');

    let filaParaEliminar = null;

    function abrirModalUsuario() {
        modalUsuario.style.display = 'flex';
    }
    function cerrarModalUsuario() {
        modalUsuario.style.display = 'none';
        modalForm.reset();
        inputId.value = '';
    }

    function abrirModalEliminar() {
        modalEliminar.style.display = 'flex';
    }
    function cerrarModalEliminar() {
        modalEliminar.style.display = 'none';
        filaParaEliminar = null;
    }

    botonCrear.addEventListener('click', () => {
        modalTitulo.textContent = 'Crear Nuevo Usuario';
        abrirModalUsuario();
    });

    botonesEditar.forEach(boton => {
        boton.addEventListener('click', () => {
            modalTitulo.textContent = 'Editar Usuario';
            
            const fila = boton.closest('tr');
            
            const id = fila.children[0].textContent;
            const nombre = fila.children[1].textContent;
            const rol = fila.children[2].textContent;
            
            inputId.value = id;
            inputNombre.value = nombre;
            inputRol.value = rol;
            
            abrirModalUsuario();
        });
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            filaParaEliminar = boton.closest('tr');
            abrirModalEliminar();
        });
    });

    botonConfirmarEliminar.addEventListener('click', () => {
        if (filaParaEliminar) {
            filaParaEliminar.remove();
            alert('Usuario eliminado.');
        }
        cerrarModalEliminar();
    });

    botonCancelarEliminar.addEventListener('click', cerrarModalEliminar);

    botonesCerrarModal.forEach(boton => {
        boton.addEventListener('click', () => {
            cerrarModalUsuario();
            cerrarModalEliminar();
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target == modalUsuario) {
            cerrarModalUsuario();
        }
        if (e.target == modalEliminar) {
            cerrarModalEliminar();
        }
    });

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = inputNombre.value;
        const rol = inputRol.value;
        const id = inputId.value;

        if (id) {
            alert(`Usuario ${id} (${nombre}) actualizado (simulación).`);
        } else {
            alert(`Nuevo usuario "${nombre}" creado (simulación).`);
        }
        
        cerrarModalUsuario();
    });

</script>
</body>
</html>
