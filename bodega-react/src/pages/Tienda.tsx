import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productoService';
import type { ProductoApi } from '../services/productoService';
import { useCarrito } from '../hooks/CarritoContext';

const API_BASE_URL = 'http://localhost:3000';

function Tienda() {
  const { agregarProducto } = useCarrito();

  const [productos, setProductos] = useState<ProductoApi[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const [buscar, setBuscar] = useState('');
  const [categoria, setCategoria] = useState('0');
  const [ordenar, setOrdenar] = useState('');

  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const categorias = productos
    .map((producto) => producto.Categoria)
    .filter((categoria, index, array) =>
      categoria &&
      array.findIndex((item) => item?.id === categoria.id) === index
    );

  const productosFiltrados = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(buscar.toLowerCase())
    )
    .filter((producto) =>
      categoria === '0'
        ? true
        : producto.categoria_id === Number(categoria)
    )
    .sort((a, b) => {
      if (ordenar === 'precio_asc') {
        return Number(a.precio_venta) - Number(b.precio_venta);
      }

      if (ordenar === 'precio_desc') {
        return Number(b.precio_venta) - Number(a.precio_venta);
      }

      if (ordenar === 'nombre_asc') {
        return a.nombre.localeCompare(b.nombre);
      }

      if (ordenar === 'nombre_desc') {
        return b.nombre.localeCompare(a.nombre);
      }

      return 0;
    });

  const agregarAlCarrito = (producto: ProductoApi) => {
    agregarProducto({
      idProducto: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio_venta),
    });

    setMensaje(`${producto.nombre} agregado al carrito`);

    setTimeout(() => {
      setMensaje('');
    }, 2500);
  };

  if (cargando) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">
          Cargando productos...
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* FILTROS */}
        <aside className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white fw-bold">
              Filtros
            </div>

            <div className="card-body">
              <label className="form-label">Buscar:</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar producto..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
              />

              <label className="form-label">Categoría:</label>
              <select
                className="form-select mb-3"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="0">Todas</option>

                {categorias.map((cat) => (
                  <option
                    key={cat?.id}
                    value={cat?.id}
                  >
                    {cat?.nombre}
                  </option>
                ))}
              </select>

              <label className="form-label">Ordenar por:</label>
              <select
                className="form-select mb-3"
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
              >
                <option value="">Sin orden</option>
                <option value="precio_asc">Precio: menor a mayor</option>
                <option value="precio_desc">Precio: mayor a menor</option>
                <option value="nombre_asc">Nombre A-Z</option>
                <option value="nombre_desc">Nombre Z-A</option>
              </select>

              <button
                type="button"
                className="btn btn-success w-100"
                onClick={() => {
                  setBuscar('');
                  setCategoria('0');
                  setOrdenar('');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </aside>

        {/* PRODUCTOS */}
        <section className="col-md-9">
          <h3 className="fw-bold mb-3">
            Productos disponibles
          </h3>

          {mensaje && (
            <div className="alert alert-success shadow-sm">
              ✅ {mensaje}
            </div>
          )}

          <div className="row g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div
                  className="col-md-4"
                  key={producto.id}
                >
                  <div className="card shadow-sm h-100">

                    <img
                      src={`${API_BASE_URL}${producto.url_imagen}`}
                      className="card-img-top"
                      style={{
                        height: '180px',
                        objectFit: 'contain',
                        padding: '15px',
                      }}
                      alt={producto.nombre}
                      onError={(e) => {
                        e.currentTarget.src = '/imagenes/productos/default.jpg';
                      }}
                    />

                    <div className="card-body">
                      <h5 className="card-title">
                        {producto.nombre}
                      </h5>

                      <p className="text-muted small mb-2">
                        {producto.Categoria?.nombre}
                      </p>

                      <p className="mb-1">
                        <strong>SKU:</strong> {producto.sku}
                      </p>

                      <p className="mb-1">
                        <strong>Unidad:</strong> {producto.unidad_medida}
                      </p>

                      <p className="mb-1">
                        <strong>Stock:</strong> {producto.stock_actual}
                      </p>

                      <p className="small text-muted mt-2">
                        {producto.descripcion}
                      </p>

                      <p className="text-success fs-5 fw-bold">
                        S/ {Number(producto.precio_venta).toFixed(2)}
                      </p>
                    </div>

                    <div className="card-footer bg-white">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={producto.stock_actual <= 0}
                      >
                        {producto.stock_actual > 0
                          ? 'Agregar al Carrito'
                          : 'Sin stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-warning">
                No se encontraron productos.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Tienda;