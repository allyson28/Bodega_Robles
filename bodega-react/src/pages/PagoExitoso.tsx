import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/PagoExitoso.css';

type ProductoPedido = {
  idProducto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
};

type PedidoFinalizado = {
  id: number;
  fecha: string;
  metodoPago: string;
  productos: ProductoPedido[];
  total: number;
};

function PagoExitoso() {
  const [pedido, setPedido] = useState<PedidoFinalizado | null>(null);

  useEffect(() => {
    const pedidoGuardado = localStorage.getItem('ultimo_pedido_bodega_robles');

    if (pedidoGuardado) {
      try {
        setPedido(JSON.parse(pedidoGuardado));
      } catch (error) {
        console.error('Error al leer el último pedido:', error);
      }
    }
  }, []);

  const descargarComprobante = () => {
    alert('Función de descarga de comprobante PDF pendiente de integrar.');
  };

  const cantidadTotal = pedido
    ? pedido.productos.reduce(
        (acumulador, producto) => acumulador + producto.cantidad,
        0
      )
    : 0;

  return (
    <div className="pago-page">
      <div className="pago-wrapper">
        <div className="pago-hero">
          <div className="pago-icon">✓</div>

          <h2 className="pago-title">
            Pago realizado con éxito
          </h2>

          <p className="pago-subtitle">
            Gracias por tu compra. Tu pedido fue registrado correctamente.
          </p>
        </div>

        {pedido ? (
          <>
            <section className="pago-card">
              <div className="pago-card-header">
                <h4>Resumen del pedido</h4>
                <span>Pedido #{pedido.id}</span>
              </div>

              <div className="pago-info">
                <div className="pago-info-box">
                  <span>Fecha</span>
                  <strong>{pedido.fecha}</strong>
                </div>

                <div className="pago-info-box">
                  <span>Método de pago</span>
                  <strong>{pedido.metodoPago.toUpperCase()}</strong>
                </div>

                <div className="pago-info-box">
                  <span>Productos</span>
                  <strong>{cantidadTotal}</strong>
                </div>
              </div>

              <div className="pago-products">
                <h5 className="pago-products-title">
                  Productos comprados
                </h5>

                <div className="pago-product-list">
                  {pedido.productos.map((producto) => (
                    <article
                      className="pago-product-item"
                      key={producto.idProducto}
                    >
                      <div>
                        <div className="pago-product-name">
                          {producto.nombre}
                        </div>

                        <div className="pago-product-detail">
                          Cantidad: {producto.cantidad}
                        </div>
                      </div>

                      <div className="pago-product-detail">
                        Unitario
                      </div>

                      <div className="pago-product-price">
                        S/ {producto.precio.toFixed(2)}
                      </div>

                      <div className="pago-product-subtotal">
                        S/ {(producto.precio * producto.cantidad).toFixed(2)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="pago-summary">
                <div className="pago-summary-box">
                  <div className="pago-summary-line">
                    <span>Subtotal</span>
                    <strong>S/ {pedido.total.toFixed(2)}</strong>
                  </div>

                  <div className="pago-summary-line">
                    <span>Descuento</span>
                    <strong>S/ 0.00</strong>
                  </div>

                  <div className="pago-summary-total">
                    <span>Total pagado</span>
                    <strong>S/ {pedido.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </section>

            <div className="pago-actions">
              <button
                className="btn-comprobante"
                onClick={descargarComprobante}
              >
                Descargar Comprobante PDF
              </button>

              <Link to="/tienda" className="btn-volver-tienda">
                Volver a la tienda
              </Link>

              <Link to="/historial" className="btn-volver-tienda">
                Ver historial
              </Link>
            </div>
          </>
        ) : (
          <div className="pago-empty">
            <h4>No se encontró información del pedido</h4>

            <p>
              No hay un pedido reciente para mostrar en esta pantalla.
            </p>

            <Link to="/tienda" className="btn btn-success">
              Volver a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PagoExitoso;