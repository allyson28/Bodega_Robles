import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../hooks/CarritoContext';
import { crearPedido } from '../services/pedidoService';

function Checkout() {
  const { carrito, total, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const [metodoPago, setMetodoPago] = useState('');

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
    const respuestaPedido = await crearPedido({
      carrito,
      metodoPago,
    });

    const pedidoFinalizado = {
      id: respuestaPedido.data?.id || Date.now(),
      fecha: new Date().toLocaleString('es-PE'),
      metodoPago,
      productos: carrito,
      total,
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
  }
};

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4 text-center">
        💳 Checkout - Finalizar Compra
      </h2>

      {carrito.length === 0 ? (
        <div className="alert alert-warning text-center">
          <p className="mb-3">
            No hay productos en el carrito.
          </p>

          <Link to="/tienda" className="btn btn-success">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="row g-4">

          {/* RESUMEN DE COMPRA */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white fw-bold">
                🛍️ Resumen de la compra
              </div>

              <ul className="list-group list-group-flush">
                {carrito.map((item) => (
                  <li
                    key={item.idProducto}
                    className="list-group-item"
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        {item.nombre} (x{item.cantidad})
                      </span>

                      <span className="fw-bold">
                        S/ {(item.precio * item.cantidad).toFixed(2)}
                      </span>
                    </div>

                    <small className="text-muted">
                      Precio unitario: S/ {item.precio.toFixed(2)}
                    </small>
                  </li>
                ))}
              </ul>

              <div className="p-3 text-end">
                <h4>
                  Total a pagar:{' '}
                  <span className="text-success fw-bold">
                    S/ {total.toFixed(2)}
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* MÉTODOS DE PAGO */}
          <div className="col-md-6">
            <form onSubmit={finalizarCompra}>
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                  Seleccione método de pago
                </div>

                <div className="card-body">
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

                  {/* FORM TARJETA */}
                  {metodoPago === 'tarjeta' && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Datos de Tarjeta</h6>

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

                      <small className="text-muted">
                        Este formulario es solo una simulación para el proyecto.
                      </small>
                    </div>
                  )}

                  {/* FORM YAPE */}
                  {metodoPago === 'yape' && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Pagar con Yape</h6>
                      <p>Escanea el siguiente QR o ingresa tu número.</p>

                      <img
                        src="/imagenes/qr-yape.png"
                        className="img-fluid mb-2"
                        style={{ maxWidth: '180px' }}
                        alt="QR Yape"
                      />

                      <input
                        type="text"
                        name="yapeNum"
                        placeholder="Número Yape"
                        className="form-control mb-2"
                      />
                    </div>
                  )}

                  {/* FORM PLIN */}
                  {metodoPago === 'plin' && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Pagar con Plin</h6>
                      <p>Escanea el QR o ingresa tu número.</p>

                      <img
                        src="/imagenes/qr-plin.png"
                        className="img-fluid mb-2"
                        style={{ maxWidth: '180px' }}
                        alt="QR Plin"
                      />

                      <input
                        type="text"
                        name="plinNum"
                        placeholder="Número Plin"
                        className="form-control mb-2"
                      />
                    </div>
                  )}

                  <button
                    className="btn btn-success w-100 btn-lg mt-3"
                    type="submit"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}

export default Checkout;