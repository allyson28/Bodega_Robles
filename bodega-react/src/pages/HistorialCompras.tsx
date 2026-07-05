import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ProductoHistorial = {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

type Compra = {
  id: number;
  fecha: string;
  metodoPago: string;
  total: number;
  productos: ProductoHistorial[];
};

function HistorialCompras() {
  const [historial, setHistorial] = useState<Compra[]>([]);
  const [compraSeleccionada, setCompraSeleccionada] = useState<Compra | null>(null);

  useEffect(() => {
    const historialGuardado = localStorage.getItem('historial_compras_bodega_robles');

    if (historialGuardado) {
      try {
        setHistorial(JSON.parse(historialGuardado));
      } catch (error) {
        console.error('Error al leer el historial de compras:', error);
        setHistorial([]);
      }
    }
  }, []);

  const limpiarHistorial = () => {
    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar todo el historial de compras?'
    );

    if (!confirmar) return;

    localStorage.removeItem('historial_compras_bodega_robles');
    setHistorial([]);
    setCompraSeleccionada(null);
  };

  return (
    <>
      <h2 className="text-center mt-4">
        🛒 Historial de Compras
      </h2>

      <div className="container mt-4">
        {historial.length > 0 ? (
          <div className="text-end mb-3">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={limpiarHistorial}
            >
              Limpiar historial
            </button>
          </div>
        ) : null}

        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Método</th>
              <th>Total</th>
              <th>Detalle</th>
            </tr>
          </thead>

          <tbody>
            {historial.length > 0 ? (
              historial.map((compra, index) => (
                <tr key={compra.id}>
                  <td>{index + 1}</td>

                  <td>{compra.fecha}</td>

                  <td>{compra.metodoPago.toUpperCase()}</td>

                  <td>S/ {compra.total.toFixed(2)}</td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setCompraSeleccionada(compra)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No hay compras registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {historial.length === 0 && (
          <div className="text-center mt-3">
            <Link to="/tienda" className="btn btn-success">
              Ir a la tienda
            </Link>
          </div>
        )}

        {compraSeleccionada && (
          <div className="card shadow-sm mt-4 mb-5">
            <div className="card-header bg-success text-white fw-bold">
              Detalle de compra #{compraSeleccionada.id}
            </div>

            <div className="card-body">
              <p>
                <strong>Fecha:</strong> {compraSeleccionada.fecha}
              </p>

              <p>
                <strong>Método de pago:</strong>{' '}
                {compraSeleccionada.metodoPago.toUpperCase()}
              </p>

              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {compraSeleccionada.productos.map((producto) => (
                    <tr key={producto.idProducto}>
                      <td>{producto.nombre}</td>

                      <td>{producto.cantidad}</td>

                      <td>S/ {producto.precio.toFixed(2)}</td>

                      <td>
                        S/ {(producto.precio * producto.cantidad).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-end">
                <h5>
                  Total:{' '}
                  <span className="text-success fw-bold">
                    S/ {compraSeleccionada.total.toFixed(2)}
                  </span>
                </h5>
              </div>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setCompraSeleccionada(null)}
              >
                Ocultar detalle
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HistorialCompras;