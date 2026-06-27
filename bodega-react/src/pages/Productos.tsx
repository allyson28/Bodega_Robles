function Productos() {
  return (
    <main className="container py-5">
      <h2 className="text-success fw-bold mb-4">
        Productos disponibles
      </h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Arroz Costeño</h5>
              <p className="card-text">Producto de primera necesidad.</p>
              <p className="fw-bold">S/ 4.50</p>
              <button className="btn btn-success w-100">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Productos;