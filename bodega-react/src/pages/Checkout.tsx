import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../hooks/CarritoContext';
import { crearPedido } from '../services/pedidoService';
import '../styles/Checkout.css';

function Checkout() {
  const {
  carrito,
  total,
  descuento,
  totalFinal,
  cuponAplicado,
  vaciarCarrito,
} = useCarrito();

  const navigate = useNavigate();

  const [metodoPago, setMetodoPago] = useState('');
  const [procesando, setProcesando] = useState(false);

  const cantidadTotal = carrito.reduce(
    (acumulador, item) => acumulador + item.cantidad,
    0
  );

    console.log('Checkout:', {
    total,
    descuento,
    totalFinal,
    cuponAplicado,
  });

  const finalizarCompra = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert('No hay productos en el carrito');
      return;
    }

    if (metodoPago === '') {
      alert('Seleccione un método de pago');
      return;
    }

    try {
      setProcesando(true);

      const respuestaPedido = await crearPedido({
        carrito,
        metodoPago,
      });

      const pedidoFinalizado = {
        id: respuestaPedido.data?.id || Date.now(),
        fecha: new Date().toLocaleString('es-PE'),
        metodoPago,
        productos: carrito,
        subtotal: total,
        descuento,
        cuponAplicado,
        total: totalFinal,
      };

      localStorage.setItem(
        'ultimo_pedido_bodega_robles',
        JSON.stringify(pedidoFinalizado)
      );

      const historialGuardado = localStorage.getItem(
        'historial_compras_bodega_robles'
      );

      const historial = historialGuardado
        ? JSON.parse(historialGuardado)
        : [];

      const historialActualizado = [
        pedidoFinalizado,
        ...historial,
      ];

      localStorage.setItem(
        'historial_compras_bodega_robles',
        JSON.stringify(historialActualizado)
      );

      vaciarCarrito();
      navigate('/pago-exitoso');
    } catch (error) {
      console.error('Error al registrar pedido:', error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('No se pudo registrar el pedido en la base de datos.');
      }
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">
        <div className="checkout-header">
          <h2 className="checkout-title">
            Checkout - Finalizar Compra
          </h2>

          <p className="checkout-subtitle">
            Confirma tus productos y selecciona un método de pago.
          </p>
        </div>

        {carrito.length === 0 ? (
          <div className="checkout-empty">
            <div className="checkout-empty-icon">🛒</div>

            <h4>No hay productos en el carrito</h4>

            <p>
              Agrega productos desde la tienda para poder finalizar una compra.
            </p>

            <Link to="/tienda" className="btn btn-success">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <div className="checkout-layout">
            {/* RESUMEN */}
            <section className="checkout-card">
              <div className="checkout-card-header">
                <h4>Resumen de la compra</h4>
                <p>{cantidadTotal} producto(s) seleccionado(s)</p>
              </div>

              <div className="checkout-list">
                {carrito.map((item) => (
                  <article className="checkout-item" key={item.idProducto}>
                    <div className="checkout-item-img">
                      <img
                        src={item.imagen || '/imagenes/productos/default.jpg'}
                        alt={item.nombre}
                        onError={(e) => {
                          e.currentTarget.src = '/imagenes/productos/default.jpg';
                        }}
                      />
                    </div>

                    <div className="checkout-item-info">
                      <h5>{item.nombre}</h5>
                      <p>
                        Cantidad: {item.cantidad} | Precio unitario: S/{' '}
                        {item.precio.toFixed(2)}
                      </p>
                    </div>

                    <div className="checkout-item-price">
                      S/ {(item.precio * item.cantidad).toFixed(2)}
                    </div>
                  </article>
                ))}
              </div>

              <div className="checkout-total-box">
                <div className="checkout-total-line">
                  <span>Productos</span>
                  <strong>{cantidadTotal}</strong>
                </div>

                <div className="checkout-total-line">
                  <span>Subtotal</span>
                  <strong>S/ {total.toFixed(2)}</strong>
                </div>

                <div className="checkout-total-line">
                  <span>
                    Descuento {cuponAplicado ? `(${cuponAplicado})` : ''}
                  </span>
                  <strong>- S/ {descuento.toFixed(2)}</strong>
                </div>

                <div className="checkout-total-final">
                  <span>Total a pagar</span>
                  <span>S/ {totalFinal.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* MÉTODO DE PAGO */}
            <aside className="checkout-payment-card">
              <div className="checkout-payment-header">
                <h4>Método de pago</h4>
                <p>Selecciona cómo deseas pagar tu pedido.</p>
              </div>

              <form onSubmit={finalizarCompra}>
                <div className="checkout-payment-body">
                  <label className="form-label">
                    Seleccione método de pago
                  </label>

                  <select
                    name="metodoPago"
                    className="form-select mb-3"
                    required
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="tarjeta">
                      Tarjeta de Crédito / Débito
                    </option>
                    <option value="yape">Yape</option>
                    <option value="plin">Plin</option>
                  </select>

                  {metodoPago === 'tarjeta' && (
                    <div className="payment-option-box">
                      <h5>Datos de Tarjeta</h5>

                      <input
                        type="text"
                        maxLength={16}
                        name="numTarjeta"
                        placeholder="Número de tarjeta"
                        className="form-control mb-2"
                      />

                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            maxLength={5}
                            name="fecha"
                            placeholder="MM/YY"
                            className="form-control mb-2"
                          />
                        </div>

                        <div className="col">
                          <input
                            type="text"
                            maxLength={3}
                            name="cvv"
                            placeholder="CVV"
                            className="form-control mb-2"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        name="titular"
                        placeholder="Titular de la tarjeta"
                        className="form-control mb-2"
                      />

                      <p className="mb-0">
                        Este formulario es una simulación para el proyecto.
                      </p>
                    </div>
                  )}

                  {metodoPago === 'yape' && (
                    <div className="payment-option-box">
                      <h5>Pagar con Yape</h5>
                      <p>Escanea el QR o ingresa tu número Yape.</p>

                      <img
                        src="/imagenes/qr-yape.png"
                        className="payment-qr"
                        alt="QR Yape"
                      />

                      <input
                        type="text"
                        name="yapeNum"
                        placeholder="Número Yape"
                        className="form-control"
                      />
                    </div>
                  )}

                  {metodoPago === 'plin' && (
                    <div className="payment-option-box">
                      <h5>Pagar con Plin</h5>
                      <p>Escanea el QR o ingresa tu número Plin.</p>

                      <img
                        src="/imagenes/qr-plin.png"
                        className="payment-qr"
                        alt="QR Plin"
                      />

                      <input
                        type="text"
                        name="plinNum"
                        placeholder="Número Plin"
                        className="form-control"
                      />
                    </div>
                  )}

                  <div className="checkout-actions">
                    <button
                      className="btn-finalizar"
                      type="submit"
                      disabled={procesando}
                    >
                      {procesando
                        ? 'Registrando pedido...'
                        : 'Finalizar Compra'}
                    </button>

                    <Link to="/carrito" className="btn-volver">
                      Volver al carrito
                    </Link>
                  </div>
                </div>
              </form>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;