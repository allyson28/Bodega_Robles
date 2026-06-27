import { Link } from 'react-router-dom';
import { useCarrito } from '../hooks/CarritoContext';

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    total,
  } = useCarrito();

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">🛍️ Carrito de Compras</h3>

      {carrito.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cant.</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {carrito.map((item) => (
                <tr key={item.idProducto}>
                  <td>{item.nombre}</td>

                  <td>S/ {item.precio.toFixed(2)}</td>

                  <td>
                    <div className="d-flex">
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        className="form-control w-50 me-2"
                        onChange={(e) =>
                          actualizarCantidad(
                            item.idProducto,
                            Number(e.target.value)
                          )
                        }
                      />

                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                      >
                        OK
                      </button>
                    </div>
                  </td>

                  <td>
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(item.idProducto)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4>Total: S/ {total.toFixed(2)}</h4>

            <button
              className="btn btn-outline-danger me-2"
              onClick={vaciarCarrito}
            >
              Vaciar
            </button>

            <Link to="/checkout" className="btn btn-success btn-lg">
              Proceder al Pago
            </Link>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">
          El carrito de compras está vacío.
        </div>
      )}
    </div>
  );
}

export default Carrito;