import { Link } from 'react-router-dom';
import '../styles/NavbarCliente.css';

function NavbarCliente() {
  return (
    <header className="navbar-cliente">
      <div className="navbar-inner">
        <Link className="navbar-logo" to="/tienda">
          Minimarket Los Robles 🛒
        </Link>

        <nav className="navbar-menu">
          <Link to="/tienda">Tienda</Link>
          <Link to="/carrito">Carrito 🛍️</Link>
          <Link to="/historial">Historial</Link>
          <Link className="btn-cerrar" to="/login">
            Cerrar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default NavbarCliente;