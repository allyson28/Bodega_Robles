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
  subtotal?: number;
  descuento?: number;
  cuponAplicado?: string;
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
  if (!pedido) return;

  const productosHtml = pedido.productos
    .map(
      (producto) => `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.cantidad}</td>
          <td>S/ ${producto.precio.toFixed(2)}</td>
          <td>S/ ${(producto.precio * producto.cantidad).toFixed(2)}</td>
        </tr>
      `
    )
    .join('');

  const comprobanteHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Comprobante Pedido #${pedido.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #111827;
          }

          .comprobante {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            padding: 28px;
          }

          .header {
            text-align: center;
            border-bottom: 2px solid #198754;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }

          .header h1 {
            color: #198754;
            margin: 0;
            font-size: 26px;
          }

          .header p {
            margin: 6px 0 0;
            color: #4b5563;
          }

          .info {
            margin-bottom: 24px;
            line-height: 1.8;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
          }

          th {
            background-color: #198754;
            color: white;
            padding: 10px;
            text-align: left;
          }

          td {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
          }

          .totales {
            margin-top: 24px;
            margin-left: auto;
            width: 320px;
          }

          .fila-total {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
          }

          .total-final {
            border-top: 2px solid #198754;
            margin-top: 8px;
            padding-top: 12px;
            font-size: 20px;
            font-weight: bold;
            color: #198754;
          }

          .footer {
            text-align: center;
            margin-top: 35px;
            color: #6b7280;
            font-size: 14px;
          }

          @media print {
            button {
              display: none;
            }
          }

          .acciones {
  text-align: center;
  margin-top: 28px;
}

.acciones button {
  background-color: #198754;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 22px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
}

.acciones button:hover {
  background-color: #147a3f;
}

@media print {
  .acciones {
    display: none;
  }
}
        </style>
      </head>

      <body>
        <div class="comprobante">
          <div class="header">
            <h1>Minimarket Los Robles</h1>
            <p>Comprobante de compra</p>
          </div>

          <div class="info">
            <strong>Pedido:</strong> #${pedido.id}<br />
            <strong>Fecha:</strong> ${pedido.fecha}<br />
            <strong>Método de pago:</strong> ${pedido.metodoPago}<br />
            <strong>Cupón aplicado:</strong> ${cuponAplicado || 'No aplicado'}
          </div>

          <h2>Productos comprados</h2>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${productosHtml}
            </tbody>
          </table>

          <div class="totales">
            <div class="fila-total">
              <span>Subtotal</span>
              <strong>S/ ${subtotal.toFixed(2)}</strong>
            </div>

            <div class="fila-total">
              <span>Descuento ${cuponAplicado ? `(${cuponAplicado})` : ''}</span>
              <strong>- S/ ${descuento.toFixed(2)}</strong>
            </div>

            <div class="fila-total total-final">
              <span>Total pagado</span>
              <strong>S/ ${totalPagado.toFixed(2)}</strong>
            </div>
          </div>

          <div class="footer">
            Gracias por comprar en Minimarket Los Robles.
          </div>

          <div class="acciones">
            <button onclick="window.print()">Guardar o imprimir PDF</button>
          </div>
      </div>
    </body>
  </html>
`;

  const ventana = window.open('', '_blank');

  if (ventana) {
    ventana.document.write(comprobanteHtml);
    ventana.document.close();
  }
};

  const cantidadTotal = pedido
    ? pedido.productos.reduce(
        (acumulador, producto) => acumulador + producto.cantidad,
        0
      )
    : 0;

    const subtotal = pedido?.subtotal ?? pedido?.total ?? 0;
    const descuento = pedido?.descuento ?? 0;
    const totalPagado = pedido?.total ?? 0;
    const cuponAplicado = pedido?.cuponAplicado ?? '';

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
  <strong>S/ {subtotal.toFixed(2)}</strong>
                  </div>

                  <div className="pago-summary-line">
                    <span>
                      Descuento {cuponAplicado ? `(${cuponAplicado})` : ''}
                    </span>
                    <strong>- S/ {descuento.toFixed(2)}</strong>
                  </div>

                  <div className="pago-summary-total">
                    <span>Total pagado</span>
                    <strong>S/ {totalPagado.toFixed(2)}</strong>
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