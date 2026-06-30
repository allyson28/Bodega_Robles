import { Link } from 'react-router-dom';

function PagoExitoso() {
  const descargarComprobante = () => {
    alert('Función de descarga de comprobante PDF pendiente de integrar.');
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success fw-bold">
        ✔ Pago realizado con éxito
      </h2>

      <p className="mt-3">
        Gracias por su compra
      </p>

      <button
        className="btn btn-primary btn-lg mt-3"
        onClick={descargarComprobante}
      >
        Descargar Comprobante PDF
      </button>

      <br />
      <br />

      <Link to="/tienda" className="btn btn-outline-success mt-2">
        Volver a la tienda
      </Link>
    </div>
  );
}

export default PagoExitoso;