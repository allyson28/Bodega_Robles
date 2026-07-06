import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HistorialCompras.css';

type ProductoHistorial = {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen?: string;
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
  const [mostrarModalLimpiar, setMostrarModalLimpiar] = useState(false);

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
  setMostrarModalLimpiar(true);
};

const confirmarLimpiarHistorial = () => {
  localStorage.removeItem('historial_compras_bodega_robles');
  setHistorial([]);
  setCompraSeleccionada(null);
  setMostrarModalLimpiar(false);
};

const cancelarLimpiarHistorial = () => {
  setMostrarModalLimpiar(false);
};

  const cantidadProductosDetalle = compraSeleccionada
    ? compraSeleccionada.productos.reduce(
        (acumulador, producto) => acumulador + producto.cantidad,
        0
      )
    : 0;

  return (
    <div className="historial-page">
      <div className="historial-wrapper">
        <div className="historial-header">
          <div>
            <h2 className="historial-title">
              Historial de Compras
            </h2>

            <p className="historial-subtitle">
              Consulta las compras realizadas y revisa el detalle de cada pedido.
            </p>
          </div>

          {historial.length > 0 && (
            <button
              className="btn-limpiar-historial"
              onClick={limpiarHistorial}
            >
              Limpiar historial
            </button>
          )}
        </div>

        {historial.length > 0 ? (
          <>
            <section className="historial-card">
              <table className="historial-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Método</th>
                    <th>Total</th>
                    <th>Detalle</th>
                  </tr>
                </thead>

                <tbody>
                  {historial.map((compra, index) => (
                    <tr key={compra.id}>
                      <td className="historial-numero">
                        {index + 1}
                      </td>

                      <td className="historial-fecha">
                        {compra.fecha}
                      </td>

                      <td>
                        <span className="historial-metodo">
                          {compra.metodoPago.toUpperCase()}
                        </span>
                      </td>

                      <td className="historial-total">
                        S/ {compra.total.toFixed(2)}
                      </td>

                      <td>
                        <button
                          className="btn-ver-detalle"
                          onClick={() => setCompraSeleccionada(compra)}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {compraSeleccionada && (
              <section className="historial-detalle-card">
                <div className="detalle-header">
                  <h4>Detalle de compra</h4>
                  <span>Pedido #{compraSeleccionada.id}</span>
                </div>

                <div className="detalle-body">
                  <div className="detalle-info-grid">
                    <div className="detalle-info-box">
                      <span>Fecha</span>
                      <strong>{compraSeleccionada.fecha}</strong>
                    </div>

                    <div className="detalle-info-box">
                      <span>Método de pago</span>
                      <strong>{compraSeleccionada.metodoPago.toUpperCase()}</strong>
                    </div>

                    <div className="detalle-info-box">
                      <span>Productos</span>
                      <strong>{cantidadProductosDetalle}</strong>
                    </div>
                  </div>

                  <div className="detalle-productos">
                    {compraSeleccionada.productos.map((producto) => (
                      <article
                        className="detalle-producto-item"
                        key={producto.idProducto}
                      >
                        <div>
                          <div className="detalle-producto-nombre">
                            {producto.nombre}
                          </div>

                          <div className="detalle-producto-label">
                            Cantidad: {producto.cantidad}
                          </div>
                        </div>

                        <div className="detalle-producto-label">
                          Unitario
                        </div>

                        <div className="detalle-producto-precio">
                          S/ {producto.precio.toFixed(2)}
                        </div>

                        <div className="detalle-producto-subtotal">
                          S/ {(producto.precio * producto.cantidad).toFixed(2)}
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="detalle-total-box">
                    <div className="detalle-total">
                      <div className="detalle-total-line">
                        <span>Total</span>
                        <span>S/ {compraSeleccionada.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detalle-actions">
                    <button
                      className="btn-ocultar-detalle"
                      onClick={() => setCompraSeleccionada(null)}
                    >
                      Ocultar detalle
                    </button>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="historial-vacio">
            <div className="historial-vacio-icon">🛒</div>

            <h4>No hay compras registradas</h4>

            <p>
              Cuando finalices una compra, aparecerá automáticamente en este historial.
            </p>

            <Link to="/tienda" className="btn btn-success">
              Ir a la tienda
            </Link>
          </div>
        )}
        {mostrarModalLimpiar && (
  <div className="modal-historial-overlay">
    <div className="modal-historial">
      <div className="modal-historial-icon">!</div>

      <h3>Limpiar historial</h3>

      <p>
        ¿Seguro que deseas eliminar todo el historial de compras?
        Esta acción no se puede deshacer.
      </p>

      <div className="modal-historial-actions">
        <button
          type="button"
          className="btn-modal-cancelar"
          onClick={cancelarLimpiarHistorial}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="btn-modal-eliminar"
          onClick={confirmarLimpiarHistorial}
        >
          Sí, limpiar
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
    

  );

}

export default HistorialCompras;