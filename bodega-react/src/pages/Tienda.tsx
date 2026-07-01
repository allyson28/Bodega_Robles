import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productoService';
import type { ProductoApi } from '../services/productoService';
import { useCarrito } from '../hooks/CarritoContext';

function Tienda() {
  const { agregarProducto } = useCarrito();

  const [productos, setProductos] = useState<ProductoApi[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const [buscar, setBuscar] = useState('');
  const [categoria, setCategoria] = useState('0');

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
    .map((producto) => producto.Categorium)
    .filter((categoria, index, array) =>
      categoria &&
      array.findIndex(
        (item) => item?.id_categoria === categoria.id_categoria
      ) === index
    );

  const productosFiltrados = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(buscar.toLowerCase())
    )
    .filter((producto) =>
      categoria === '0'
        ? true
        : producto.id_categoria === Number(categoria)
    );

  const agregarAlCarrito = (producto: ProductoApi) => {
    agregarProducto({
      idProducto: producto.id_producto,
      nombre: producto.nombre,
      precio: 0,
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
                    key={cat?.id_categoria}
                    value={cat?.id_categoria}
                  >
                    {cat?.nombre}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn btn-success w-100"
                onClick={() => {
                  setBuscar('');
                  setCategoria('0');
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
                  key={producto.id_producto}
                >
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        {producto.nombre}
                      </h5>

                      <p className="text-muted small mb-2">
                        {producto.Categorium?.nombre}
                      </p>

                      <p className="mb-1">
                        <strong>Marca:</strong> {producto.marca}
                      </p>

                      <p className="mb-1">
                        <strong>Unidad:</strong> {producto.unidad_medida}
                      </p>

                      <p className="small text-muted mt-2">
                        {producto.descripcion}
                      </p>
                    </div>

                    <div className="card-footer bg-white">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        Agregar al Carrito
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