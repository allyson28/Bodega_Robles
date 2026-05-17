<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>CREAR CATEGORIA</title>
    </head>
    <body>
        <h1>Crear categoria!</h1>
        <form action="<%= request.getContextPath() %>/CategoriaController" method="post">
            <input type="hidden" name="action" value="create">

            Nombre: <br>
            <input type="text" name="nombre" required><br><br>

            Descripción: <br>
            <textarea name="descripcion"></textarea><br><br>

            <button type="submit">Crear</button>
        </form>

        <br>
        <a href="<%= request.getContextPath() %>/CategoriaController">Volver</a>
    </body>
</html>
