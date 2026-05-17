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
    <title>Panel - Reportes</title>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Poppins','Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f5f5;}
.contenedor-principal{display:flex;min-height:100vh;}
.menu-lateral{position:fixed;top:0;left:0;height:100vh;z-index:100;width:260px;background:white;color:#27ae60;display:flex;flex-direction:column;box-shadow:2px 0 10px rgba(0,0,0,0.1);}
.encabezado-negocio{display:flex;align-items:center;padding:20px;gap:10px;border-bottom:1px solid #eee;}
.nombre-negocio{font-weight:600;font-size:16px;line-height:1.2;color:black;}
.seccion-usuario{padding:15px 20px;display:flex;align-items:center;gap:15px;border-bottom:1px solid #e0e0e0;}
.foto-usuario{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#27ae60 0%,#229954 100%);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:white;}
.nombre-usuario{font-size:15px;font-weight:600;color:black;}
.rol-usuario{font-size:13px;color:#7f8c8d;}
.navegacion{flex:1;padding:15px 0;overflow-y:auto;}
.boton-menu{display:flex;align-items:center;gap:15px;padding:12px 20px;margin:4px 10px;color:#303030;text-decoration:none;transition:all 0.3s ease;border-radius:8px;cursor:pointer;}
.boton-menu .icono{display:flex;align-items:center;opacity:0.7;}
.boton-menu:hover,.boton-menu.activo{background-color:#e8f5e9;color:#27ae60;font-weight:600;}
.boton-menu:hover .icono,.boton-menu.activo .icono{opacity:1;}
.seccion-cerrar{padding:20px;border-top:1px solid #e0e0e0;}
.boton-cerrar{display:flex;align-items:center;justify-content:center;gap:12px;padding:11px 16px;background-color:#a02809;color:white;border-radius:8px;transition:all 0.3s ease;cursor:pointer;border:none;width:100%;font-size:15px;font-weight:550;}
.boton-cerrar:hover{background-color:#861e04;transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.2);}
.contenido-principal{margin-left:260px;flex:1;padding:30px;overflow-y:auto;}
.titulo-contenido{font-size:28px;color:#2c3e50;margin-bottom:20px;font-weight:600;}
.seccion-filtros{display:flex;gap:15px;margin-bottom:20px;align-items:center;flex-wrap:wrap;background-color:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}
.seccion-filtros label{font-weight:500;color:#333;}
.input-fecha{padding:10px 15px;border:2px solid #e0e0e0;border-radius:8px;font-size:14px;font-family:'Poppins',sans-serif;transition:all 0.3s ease;}
.input-fecha:focus{outline:none;border-color:#27ae60;}
.btn-generar,.btn-imprimir{padding:12px 25px;color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s ease;}
.btn-generar{background-color:#557c3e;}
.btn-generar:hover{background-color:#466834;}
.btn-imprimir{background-color:#3498db;margin-left:auto;}
.btn-imprimir:hover{background-color:#2980b9;}
.contenedor-metricas{display:flex;gap:20px;margin-bottom:20px;flex-wrap:wrap;}
.metrica-card{flex:1 1 200px;background-color:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);border-top:4px solid #27ae60;}
.metrica-card h3{font-size:15px;color:#7f8c8d;font-weight:500;text-transform:uppercase;margin-bottom:10px;}
.metrica-card p{font-size:28px;font-weight:600;color:#2c3e50;}
.contenedor-graficos{display:flex;gap:20px;margin-bottom:20px;flex-wrap:wrap;}
.grafico-card{flex:1 1 45%;min-width:300px;background-color:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}
.grafico-card h3{margin-bottom:15px;font-size:18px;color:#333;}
.contenedor-tabla{background:white;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);overflow:hidden;}
.tabla-datos{width:100%;border-collapse:collapse;font-size:14px;}
.tabla-datos thead{background:linear-gradient(135deg,#27ae60 0%,#229954 100%);color:white;}
.tabla-datos thead th{padding:15px 12px;text-align:left;font-weight:600;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;}
.tabla-datos tbody tr{border-bottom:1px solid #f0f0f0;}
.tabla-datos tbody tr:hover{background-color:#f8f9fa;}
.tabla-datos tbody td{padding:12px;color:#2c3e50;}
.texto-cargando{text-align:center;padding:40px !important;color:#7f8c8d;font-style:italic;}
@media print{body>*{display:none;}body{background-color:#fff;}.contenido-principal,.contenido-principal *{display:block !important;visibility:visible !important;}.contenido-principal{position:absolute;left:0;top:0;padding:20px;width:100%;}.menu-lateral,.seccion-filtros,.titulo-contenido,.btn-accion{display:none !important;}.contenedor-metricas,.contenedor-graficos{flex-wrap:nowrap;page-break-inside:avoid;}.metrica-card,.grafico-card,.contenedor-tabla{box-shadow:none;border:1px solid #ccc;page-break-inside:avoid;}.tabla-datos thead{background-color:#eee !important;color:#000 !important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}canvas{max-width:100% !important;}}

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
                <a href="reportes.jsp" class="boton-menu activo">
                    <span class="icono"><img src="imagenes/reportes.png" width="30px"></span>
                    <span class="texto-boton">Reportes</span>
                </a>
                <a href="abastecimiento.jsp" class="boton-menu activo">
                    <span class="icono"><img src="imagenes/abastecimiento.png" width="30px"></span>
                    <span class="texto-boton">Abastecimiento</span>
                </a>
                <a href="pedidos.jsp" class="boton-menu">
                    <span class="icono"><img src="imagenes/ventas.png" width="30px"></span>
                    <span class="texto-boton">Pedidos</span>
                </a>
                <a href="productos.jsp" class="boton-menu">
                    <span class="icono"><img src="imagenes/producto.png" width="30px"></span>
                    <span class="texto-boton">Inventario</span>
                </a>
                
                <a href="proveedores.jsp" class="boton-menu activo">
                    <img src="imagenes/producto.png" width="26px">
                    Proveedores
                </a>
                
                <a href="usuarios.jsp" class="boton-menu">
                    <span class="icono"><img src="imagenes/Empleados.png" width="30px"></span>
                    <span class="texto-boton">Usuarios</span>
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
            <h1 class="titulo-contenido">Panel de Reportes</h1>
            
            <div class="seccion-filtros">
                <label for="fecha-inicio">Desde:</label>
                <input type="date" id="fecha-inicio" class="input-fecha">
                <label for="fecha-fin">Hasta:</label>
                <input type="date" id="fecha-fin" class="input-fecha">
                <button id="btn-generar-reporte" class="btn-generar">Generar</button>
                <button id="btn-imprimir-reporte" class="btn-imprimir">Imprimir (PDF)</button>
            </div>

            <div class="contenedor-metricas">
                <div class="metrica-card">
                    <h3>Ventas Totales</h3>
                    <p id="metrica-total-ventas">S/ 0.00</p>
                </div>
                <div class="metrica-card">
                    <h3>N° de Ventas</h3>
                    <p id="metrica-num-ventas">0</p>
                </div>
                <div class="metrica-card">
                    <h3>Productos Vendidos</h3>
                    <p id="metrica-prod-vendidos">0</p>
                </div>
            </div>

            <div class="contenedor-graficos">
                <div class="grafico-card">
                    <h3>Ventas por Día</h3>
                    <canvas id="graficoVentasDia"></canvas>
                </div>
                <div class="grafico-card">
                    <h3>Ventas por Categoría</h3>
                    <canvas id="graficoVentasCategoria"></canvas>
                </div>
            </div>
            
            <div class="contenedor-tabla">
                <table id="tablaReportes" class="tabla-datos">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>N° Ventas</th>
                            <th>Productos</th>
                            <th>Subtotal</th>
                            <th>IGV</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="tablaReportesBody">
                        <tr><td colspan="6" class="texto-cargando">Genera un reporte...</td></tr>
                    </tbody>
                </table>
            </div>

        </main>
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

    let graficoBarras;
    let graficoDona;

    function cargarReportes() {
        
        const dummyDatosReporte = {
            totalVentas: 18500.75,
            numVentas: 78,
            prodVendidos: 430,
            ventasPorDia: [1200, 1900, 3000, 5000, 2300, 3100, 2000],
            dias: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            ventasPorCategoria: [35, 25, 15, 10, 15],
            categorias: ['Abarrotes', 'Bebidas', 'Limpieza', 'Lácteos', 'Otros'],
            tablaResumen: [
                { fecha: '14/11/2025', numVentas: 15, productos: 80, subtotal: 3500.00, igv: 630.00, total: 4130.00 },
                { fecha: '13/11/2025', numVentas: 12, productos: 65, subtotal: 2800.00, igv: 504.00, total: 3304.00 },
                { fecha: '12/11/2025', numVentas: 20, productos: 110, subtotal: 5100.00, igv: 918.00, total: 6018.00 }
            ]
        };

        document.getElementById('metrica-total-ventas').textContent = `S/ ${dummyDatosReporte.totalVentas.toFixed(2)}`;
        document.getElementById('metrica-num-ventas').textContent = dummyDatosReporte.numVentas;
        document.getElementById('metrica-prod-vendidos').textContent = dummyDatosReporte.prodVendidos;

        const tbody = document.getElementById('tablaReportesBody');
        tbody.innerHTML = '';
        if (dummyDatosReporte.tablaResumen.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="texto-vacio">No hay datos para este rango</td></tr>';
        } else {
            dummyDatosReporte.tablaResumen.forEach(fila => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${fila.fecha}</td>
                    <td>${fila.numVentas}</td>
                    <td>${fila.productos}</td>
                    <td>S/ ${fila.subtotal.toFixed(2)}</td>
                    <td>S/ ${fila.igv.toFixed(2)}</td>
                    <td>S/ ${fila.total.toFixed(2)}</td>
                `;
                tbody.appendChild(tr);
            });
        }
        
        const ctxBarra = document.getElementById('graficoVentasDia').getContext('2d');
        if (graficoBarras) {
            graficoBarras.destroy();
        }
        graficoBarras = new Chart(ctxBarra, {
            type: 'bar',
            data: {
                labels: dummyDatosReporte.dias,
                datasets: [{
                    label: 'Ventas S/',
                    data: dummyDatosReporte.ventasPorDia,
                    backgroundColor: 'rgba(39, 174, 96, 0.7)',
                    borderColor: 'rgba(39, 174, 96, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        const ctxDona = document.getElementById('graficoVentasCategoria').getContext('2d');
        if (graficoDona) {
            graficoDona.destroy();
        }
        graficoDona = new Chart(ctxDona, {
            type: 'doughnut',
            data: {
                labels: dummyDatosReporte.categorias,
                datasets: [{
                    label: 'Ventas por Categoría',
                    data: dummyDatosReporte.ventasPorCategoria,
                    backgroundColor: [
                        'rgba(39, 174, 96, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(243, 156, 18, 0.8)',
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(149, 165, 166, 0.8)'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }

    document.getElementById('btn-generar-reporte').addEventListener('click', cargarReportes);
    
    document.getElementById('btn-imprimir-reporte').addEventListener('click', () => {
        window.print();
    });

    </script>

</body>
</html>