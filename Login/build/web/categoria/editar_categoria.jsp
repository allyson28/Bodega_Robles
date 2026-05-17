<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="model.Categoria"%>

<%
    Categoria c = (Categoria) request.getAttribute("categoria");
%>

<!DOCTYPE html>
<html>
<head>
    <title>Editar Categoria</title>
</head>
<body>

<h1>Editar categoría</h1>

<form action="CategoriaController" method="post">
    <input type="hidden" name="action" value="update">
    <input type="hidden" name="id" value="<%= c.getId_categoria() %>">

    Nombre: <br>
    <input type="text" name="nombre" value="<%= c.getNombre() %>" required><br><br>

    Descripción: <br>
    <textarea name="descripcion"><%= c.getDescripcion() %></textarea><br><br>

    <button type="submit">Actualizar</button>
</form>

<br>
<a href="CategoriaController">Volver</a>

</body>
</html>
