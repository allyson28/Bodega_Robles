import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type ProductoPedido = {
  idProducto: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

type PedidoFinalizado = {
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

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center">
        <h2 className="text-success fw-bold">
          ✔ Pago realizado con éxito
        </h2>

        <p className="mt-3">
          Gracias por su compra.
        </p>
      </div>

      {pedido ? (
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-success text-white fw-bold">
            Resumen del pedido
          </div>

          <div className="card-body">
            <p>
              <strong>Fecha:</strong> {pedido.fecha}
            </p>

            <p>
              <strong>Método de pago:</strong>{' '}
              {pedido.metodoPago.toUpperCase()}
            </p>

            <table className="table table-striped mt-3">
              <thead className="table-success">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {pedido.productos.map((producto) => (
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
              <h4>
                Total pagado:{' '}
                <span className="text-success fw-bold">
                  S/ {pedido.total.toFixed(2)}
                </span>
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning mt-4 text-center">
          No se encontró información del último pedido.
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg me-2"
          onClick={descargarComprobante}
        >
          Descargar Comprobante PDF
        </button>

        <Link to="/tienda" className="btn btn-outline-success btn-lg">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default PagoExitoso;