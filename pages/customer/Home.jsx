function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: "85vh",
          background:
            "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
          color: "white",
        }}
      >

        <div className="container">

          <h1
            className="display-3 fw-bold mb-4"
          >
            🍽 Food Ordering System
          </h1>

          <h3 className="mb-4">
            Delicious Food Delivered Fresh & Fast
          </h3>

          <p
            className="lead mb-5"
            style={{ maxWidth: "700px", margin: "auto" }}
          >
            Explore amazing dishes, discover new flavours,
            use AI-powered search, add your favourite food
            to cart and order easily.
          </p>


          <a
            href="/menu"
            className="btn btn-light btn-lg me-3"
            style={{
              borderRadius: "30px",
              padding: "12px 35px",
              fontWeight: "600",
            }}
          >
            🍴 Explore Menu
          </a>


          <a
            href="/search"
            className="btn btn-outline-light btn-lg"
            style={{
              borderRadius: "30px",
              padding: "12px 35px",
              fontWeight: "600",
            }}
          >
            🤖 AI Search
          </a>


        </div>

      </section>


      {/* Features Section */}

      <section className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          Why Choose Us?
        </h2>


        <div className="row">


          <div className="col-md-3 mb-4">

            <div className="card shadow border-0 h-100 text-center p-4">

              <h1>🚀</h1>

              <h5 className="fw-bold">
                Fast Delivery
              </h5>

              <p>
                Quick and reliable food ordering experience.
              </p>

            </div>

          </div>



          <div className="col-md-3 mb-4">

            <div className="card shadow border-0 h-100 text-center p-4">

              <h1>🍕</h1>

              <h5 className="fw-bold">
                Fresh Food
              </h5>

              <p>
                Quality dishes prepared with care.
              </p>

            </div>

          </div>




          <div className="col-md-3 mb-4">

            <div className="card shadow border-0 h-100 text-center p-4">

              <h1>🤖</h1>

              <h5 className="fw-bold">
                AI Search
              </h5>

              <p>
                Find food using natural language.
              </p>

            </div>

          </div>




          <div className="col-md-3 mb-4">

            <div className="card shadow border-0 h-100 text-center p-4">

              <h1>👨‍🍳</h1>

              <h5 className="fw-bold">
                Quality Food
              </h5>

              <p>
                Delicious meals made for you.
              </p>

            </div>

          </div>


        </div>

      </section>


    </div>
  );
}

export default Home;