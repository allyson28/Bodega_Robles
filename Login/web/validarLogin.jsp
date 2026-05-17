<%@page import="model.Rol"%>
<%@page import="daoimpl.RolDaoImpl"%>
<%@page import="dao.RolDao"%>
<%@page import="model.Usuario"%>
<%@page import="daoimpl.UsuarioDaoImpl"%>
<%@page import="dao.UsuarioDao"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    UsuarioDao usuario_dao = new UsuarioDaoImpl();
    String documento = request.getParameter("usuario");
    String clave = request.getParameter("clave");

    Usuario usuario = usuario_dao.obtener_usuario_por_documento(documento);
    RolDao rol_dao = new RolDaoImpl();
       
    // Verificar si el usuario existe
    if (usuario == null || usuario.getDocumento() == null || usuario.getDocumento().isEmpty()) {
        response.sendRedirect("Login.jsp?error=Usuario no existe");
        return;
    } else {
        if(usuario.getContrasena().equals(clave)){
            //  Guardar usuario en sesión
            HttpSession userSession = request.getSession();
            userSession.setAttribute("usuario", usuario);
            userSession.setAttribute("id_usuario", usuario.getId_usuario());
            userSession.setAttribute("id_rol", usuario.getId_rol());
            userSession.setAttribute("documento", usuario.getDocumento());
            userSession.setAttribute("contrasena", usuario.getContrasena());
            userSession.setAttribute("nombres", usuario.getNombres());
            userSession.setAttribute("telefono", usuario.getTelefono());
            userSession.setAttribute("correo", usuario.getCorreo());
            
            Rol rol = rol_dao.obtener_rol_por_id(usuario.getId_rol());
            
            if ((rol.getRol().equals("ADMINISTRADOR")) || (rol.getRol().equals("VENDEDOR"))) { // Redirigir a página Admin
                response.sendRedirect("reportes.jsp");
            } else {
                response.sendRedirect("../Cliente/tienda.jsp");
            }
        } else {
            // Contraseña incorrecta
            response.sendRedirect("Login.jsp?error=Contraseña incorrecta");
        }        
    }
%>
