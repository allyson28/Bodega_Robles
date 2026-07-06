import { Link } from 'react-router-dom';
import { useCarrito } from '../hooks/CarritoContext';
import '../styles/Carrito.css';
import { useEffect, useState } from 'react';

function Carrito() {
  const {
  carrito,
  actualizarCantidad,
  eliminarProducto,
  vaciarCarrito,
  total,
  descuento,
  totalFinal,
  cuponAplicado,
  aplicarCupon,
  quitarCupon,
} = useCarrito();

  const cantidadTotal = carrito.reduce(
    (acumulador, item) => acumulador + item.cantidad,
    0
  );

  const [codigoCupon, setCodigoCupon] = useState(cuponAplicado);
const [mensajeCupon, setMensajeCupon] = useState('');

useEffect(() => {
  setCodigoCupon(cuponAplicado);
}, [cuponAplicado]);

  return (
    <div className="carrito-page">
      <div className="carrito-wrapper">
        <div className="carrito-header">
          <h2 className="carrito-title">Carrito de Compras</h2>
          <p className="carrito-subtitle">
            Revisa tus productos antes de continuar con el pago.
          </p>
        </div>

        {carrito.length > 0 ? (
          <div className="carrito-layout">
            {/* LISTA DE PRODUCTOS */}
            <section className="carrito-products-card">
              <div className="carrito-card-header">
                <div>
                  <h4>Productos</h4>
                  <span>{cantidadTotal} producto(s)</span>
                </div>

                <button
                  className="btn-limpiar"
                  type="button"
                  onClick={vaciarCarrito}
                >
                  × Vaciar carrito
                </button>
              </div>

              <div className="carrito-table-header">
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Precio</span>
              </div>

              <div className="carrito-list">
                {carrito.map((item) => (
                  <article className="carrito-item" key={item.idProducto}>
                    <div className="item-info">
                      <div className="item-image">
                        <img
                          src={item.imagen || '/imagenes/productos/default.jpg'}
                          alt={item.nombre}
                          onError={(e) => {
                            e.currentTarget.src = '/imagenes/productos/default.jpg';
                          }}
                        />
                      </div>

                      <div>
                        <h5>{item.nombre}</h5>
                        <p>Precio unitario: S/ {item.precio.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="item-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          actualizarCantidad(
                            item.idProducto,
                            item.cantidad - 1
                          )
                        }
                        disabled={item.cantidad <= 1}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(
                            item.idProducto,
                            Number(e.target.value)
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          actualizarCantidad(
                            item.idProducto,
                            item.cantidad + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="item-price">
                      <strong>
                        S/ {(item.precio * item.cantidad).toFixed(2)}
                      </strong>

                      <button
                        className="item-remove"
                        type="button"
                        onClick={() => eliminarProducto(item.idProducto)}
                      >
                        ×
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* RESUMEN */}
            <aside className="carrito-summary-card">
              <h4>Resumen de compra</h4>

              <div className="summary-total">
                <span>Total</span>
                <strong>S/ {totalFinal.toFixed(2)}</strong>
              </div>

              <div className="cupon-box">
                <label>Código promocional</label>

                <div className="cupon-input-group">
                  <input
                    type="text"
                    placeholder="Ej: ROBLES10"
                    value={codigoCupon}
                    onChange={(e) => setCodigoCupon(e.target.value)}
                    disabled={!!cuponAplicado}
                  />

                  {cuponAplicado ? (
                    <button
                      type="button"
                      className="btn-quitar-cupon"
                      onClick={() => {
                        quitarCupon();
                        setCodigoCupon('');
                        setMensajeCupon('');
                      }}
                    >
                      Quitar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-aplicar-cupon"
                      onClick={() => {
                        const aplicado = aplicarCupon(codigoCupon);

                        if (aplicado) {
                          setMensajeCupon('Cupón aplicado correctamente.');
                        } else {
                          setMensajeCupon('Cupón inválido.');
                        }
                      }}
                    >
                      Aplicar
                    </button>
                  )}
                </div>

                {cuponAplicado && (
                  <p className="cupon-ok">
                    Cupón aplicado: {cuponAplicado}
                  </p>
                )}

                {mensajeCupon && !cuponAplicado && (
                  <p className="cupon-error">
                    {mensajeCupon}
                  </p>
                )}
              </div>

              <div className="summary-line">
                <span>Subtotal</span>
                <strong>S/ {total.toFixed(2)}</strong>
              </div>

              <div className="summary-line">
                <span>
                  Descuento {cuponAplicado ? `(${cuponAplicado})` : ''}
                </span>
                <strong>- S/ {descuento.toFixed(2)}</strong>
              </div>


              <Link to="/checkout" className="btn-checkout">
                Proceder al Pago
              </Link>

              <Link to="/tienda" className="btn-seguir">
                Seguir comprando
              </Link>
            </aside>
          </div>
        ) : (
          <div className="carrito-vacio">
            <div className="carrito-vacio-icon">🛒</div>

            <h4>Tu carrito está vacío</h4>

            <p>
              Agrega productos desde la tienda para continuar con tu compra.
            </p>

            <Link to="/tienda" className="btn btn-success">
              Ir a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;