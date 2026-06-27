function Home() {
  return (
    <main className="container py-5">
      <section className="row align-items-center">
        <div className="col-md-6">
          <h1 className="fw-bold text-success">
            Bienvenido a Minimarket Los Robles
          </h1>

          <p className="lead mt-3">
            Encuentra productos de primera necesidad para tu hogar,
            con una experiencia rápida, sencilla y accesible.
          </p>

          <button className="btn btn-success btn-lg mt-3">
            Ver productos
          </button>
        </div>

        <div className="col-md-6 text-center">
          <div className="display-1">🛒</div>
        </div>
      </section>
    </main>
  );
}

export default Home;