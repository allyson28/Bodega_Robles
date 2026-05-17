<%-- 
    Document   : Login
    Created on : 17 oct. 2025, 13:43:51
    Author     : User
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimarket Los Robles - Login</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    
    <style>
 :root { --green-primary: #198754; --green-light: #d1e7dd; }
body { font-family: 'Poppins', sans-serif; background-color: var(--green-light); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.main-container { max-width: 1200px; box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); border-radius: 1rem; overflow: hidden; }
.panel-formulario { background-color: white; padding: 3rem; }
.panel-imagen { background-color: var(--green-primary); display: flex; align-items: center; justify-content: center; }
.panel-imagen img { max-width: 90%; height: auto; padding: 2rem; }
.logo h2 { font-weight: 600; }
.logo span { color: var(--green-primary); }
.input-group-text { background-color: var(--green-light); border-color: var(--green-primary); color: var(--green-primary); }
.form-control:focus { border-color: var(--green-primary); box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25); }
.btn-success { background-color: var(--green-primary); border-color: var(--green-primary); }
.link-primary { color: var(--green-primary) !important; }
.link-primary:hover { color: #146c43 !important; }

    </style>
</head>
<body>

    <main class="container main-container">
        
        <div class="row g-0">
            
            <section class="col-lg-6 panel-formulario">
                
                <header class="logo mb-4 text-center">
                    <div class="mb-2">
                        <span class="fs-4">🏪</span>
                    </div>
                    <h2>Minimarket <span>Los Robles</span></h2>
                </header>

                <form action="validarLogin.jsp" method="post" class="needs-validation" novalidate>

                    
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Ingresa tu ID</label>
                        <div class="input-group">
                            <span class="input-group-text">🔑</span>
                            <input type="text" id="usuario" name="usuario" class="form-control" placeholder="ID de usuario" required>
                            <div class="invalid-feedback">
                                Por favor, ingresa tu ID de usuario.
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="clave" class="form-label">Contraseña</label>
                        <div class="input-group">
                            <span class="input-group-text">🔒</span>
                            <input type="password" id="clave" name="clave" class="form-control" placeholder="Contraseña" required>
                            <div class="invalid-feedback">
                                Por favor, ingresa tu contraseña.
                            </div>
                        </div>
                    </div>

                    <div class="text-end mb-4">
                        <a href="recuperar.html" class="link-primary text-decoration-none">¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <button type="submit" class="btn btn-success w-100 btn-lg">Iniciar Sesión</button>
                </form>
            </section>

            <section class="col-lg-6 d-none d-lg-flex panel-imagen">
                <img src="imagenes/login.png" alt="Ilustración de inicio de sesión" class="img-fluid">
            </section>
            
        </div>
        
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    
    

</body>
</html>