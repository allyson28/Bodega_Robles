import { Link } from 'react-router-dom';

type ProductoDetalle = {
  nombreProducto: string;
  precio: number;
  cantidad: number;
};

function DetallePedido() {
  const pedido = {
    idPedido: 1,
    fecha: '29/06/2026 10:30',
    total: 18.8,
  };

  const detalle: ProductoDetalle[] = [
    {
      nombreProducto: 'Arroz Costeño',
      precio: 4.5,
      cantidad: 2,
    },
    {
      nombreProducto: 'Aceite Primor',
      precio: 9.8,
      cantidad: 1,
    },
  ];

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">
        📦 Detalle del Pedido #{pedido.idPedido}
      </h3>

      <p>
        <strong>Fecha:</strong> {pedido.fecha}
      </p>

      <p>
        <strong>Total pagado:</strong>{' '}
        <span className="text-success fw-bold">
          S/ {pedido.total.toFixed(2)}
        </span>
      </p>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="table-success">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {detalle.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombreProducto}</td>
                  <td>S/ {item.precio.toFixed(2)}</td>
                  <td>{item.cantidad}</td>
                  <td>
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        to="/historial"
        className="btn btn-outline-primary mt-3"
      >
        ⬅ Volver al Historial
      </Link>
    </div>
  );
}

export default DetallePedido;