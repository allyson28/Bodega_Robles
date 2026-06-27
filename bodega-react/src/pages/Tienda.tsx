import { useState } from 'react';
import { useCarrito } from '../hooks/CarritoContext';

type Categoria = {
  id_categoria: number;
  nombre: string;
};

type Producto = {
  id_producto: number;
  nombre: string;
  id_categoria: number;
  categoria: string;
  precio: number;
};

function Tienda() {
  const { agregarProducto } = useCarrito();
  const categorias: Categoria[] = [
    { id_categoria: 1, nombre: 'Abarrotes' },
    { id_categoria: 2, nombre: 'Bebidas' },
    { id_categoria: 3, nombre: 'Limpieza' },
    { id_categoria: 4, nombre: 'Snacks' },
  ];

  const productos: Producto[] = [
    {
      id_producto: 1,
      nombre: 'Arroz Costeño',
      id_categoria: 1,
      categoria: 'Abarrotes',
      precio: 4.5,
    },
    {
      id_producto: 2,
      nombre: 'Aceite Primor',
      id_categoria: 1,
      categoria: 'Abarrotes',
      precio: 9.8,
    },
    {
      id_producto: 3,
      nombre: 'Gaseosa Inca Kola',
      id_categoria: 2,
      categoria: 'Bebidas',
      precio: 3.5,
    },
    {
      id_producto: 4,
      nombre: 'Detergente Bolívar',
      id_categoria: 3,
      categoria: 'Limpieza',
      precio: 12.9,
    },
    {
      id_producto: 5,
      nombre: 'Papas Lays',
      id_categoria: 4,
      categoria: 'Snacks',
      precio: 2.5,
    },
  ];

  const [buscar, setBuscar] = useState('');
  const [categoria, setCategoria] = useState('0');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [ordenar, setOrdenar] = useState('');
  const [mensaje, setMensaje] = useState('');

  const productosFiltrados = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(buscar.toLowerCase())
    )
    .filter((producto) =>
      categoria === '0'
        ? true
        : producto.id_categoria === Number(categoria)
    )
    .filter((producto) =>
      precioMin === ''
        ? true
        : producto.precio >= Number(precioMin)
    )
    .filter((producto) =>
      precioMax === ''
        ? true
        : producto.precio <= Number(precioMax)
    )
    .sort((a, b) => {
      if (ordenar === 'precio_asc') return a.precio - b.precio;
      if (ordenar === 'precio_desc') return b.precio - a.precio;
      if (ordenar === 'nombre_asc') return a.nombre.localeCompare(b.nombre);
      if (ordenar === 'nombre_desc') return b.nombre.localeCompare(a.nombre);
      return 0;
    });

 const agregarAlCarrito = (producto: Producto) => {
  agregarProducto({
    idProducto: producto.id_producto,
    nombre: producto.nombre,
    precio: producto.precio,
  });

  setMensaje(`${producto.nombre} agregado al carrito`);

  setTimeout(() => {
    setMensaje('');
  }, 2500);
};

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* FILTROS */}
        <aside className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white fw-bold">
              Filtros
            </div>

            <form className="card-body">
              <label className="form-label">Buscar:</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar producto…"
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
                    key={cat.id_categoria}
                    value={cat.id_categoria}
                  >
                    {cat.nombre}
                  </option>
                ))}
              </select>

              <label className="form-label">Precio mínimo:</label>
              <input
                type="number"
                className="form-control mb-3"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
              />

              <label className="form-label">Precio máximo:</label>
              <input
                type="number"
                className="form-control mb-3"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
              />

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
              >
                Aplicar
              </button>
            </form>
          </div>
        </aside>

        {/* PRODUCTOS */}
        <section className="col-md-9">
          <h3 className="fw-bold mb-3">Productos disponibles</h3>
            {mensaje && (
              <div className="alert alert-success shadow-sm">
                ✅ {mensaje}
              </div>
            )}
          <div className="row g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div className="col-md-4" key={producto.id_producto}>
                  <div className="card shadow-sm h-100">

                    <img
                      src="/imagenes/2.jpeg"
                      className="card-img-top"
                      style={{
                        height: '200px',
                        objectFit: 'contain',
                      }}
                      alt={producto.nombre}
                    />

                    <div className="card-body">
                      <h5 className="card-title">
                        {producto.nombre}
                      </h5>

                      <p className="text-muted small">
                        {producto.categoria}
                      </p>

                      <p className="text-success fs-5 fw-bold">
                        S/ {producto.precio.toFixed(2)}
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