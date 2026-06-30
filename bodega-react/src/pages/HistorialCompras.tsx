import { useState } from 'react';

type ProductoHistorial = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type Compra = {
  id: number;
  fecha: string;
  metodo: string;
  total: number;
  productos: ProductoHistorial[];
};

function HistorialCompras() {
  const [compraSeleccionada, setCompraSeleccionada] = useState<Compra | null>(null);

  const historial: Compra[] = [
    {
      id: 1,
      fecha: '2026-06-28',
      metodo: 'Yape',
      total: 18.80,
      productos: [
        {
          nombre: 'Arroz Costeño',
          cantidad: 2,
          precio: 4.50,
        },
        {
          nombre: 'Aceite Primor',
          cantidad: 1,
          precio: 9.80,
        },
      ],
    },
    {
      id: 2,
      fecha: '2026-06-29',
      metodo: 'Tarjeta',
      total: 10.50,
      productos: [
        {
          nombre: 'Gaseosa Inca Kola',
          cantidad: 3,
          precio: 3.50,
        },
      ],
    },
  ];

  return (
    <>
      <h2 className="text-center mt-4">
        🛒 Historial de Compras
      </h2>

      <div className="container mt-4">
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
                  <td>{compra.metodo}</td>
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

        {compraSeleccionada && (
          <div className="card shadow-sm mt-4">
            <div className="card-header bg-success text-white fw-bold">
              Detalle de compra #{compraSeleccionada.id}
            </div>

            <div className="card-body">
              <p>
                <strong>Fecha:</strong> {compraSeleccionada.fecha}
              </p>

              <p>
                <strong>Método de pago:</strong> {compraSeleccionada.metodo}
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
                  {compraSeleccionada.productos.map((producto, index) => (
                    <tr key={index}>
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