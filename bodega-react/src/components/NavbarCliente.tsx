import { Link } from 'react-router-dom';

function NavbarCliente() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
      <Link className="navbar-brand fw-bold" to="/tienda">
        Minimarket Los Robles 🛒
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/tienda">
              Tienda
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/carrito">
              Carrito 🛍️
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/historial">
              Historial
            </Link>
          </li>

          <li className="nav-item">
            <Link className="btn btn-light ms-3" to="/login">
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarCliente;