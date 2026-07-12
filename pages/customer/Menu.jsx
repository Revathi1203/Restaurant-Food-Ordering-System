import { useEffect, useState } from "react";
import api from "../../services/api";
import { addToCart } from "../../services/cart";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Tiffins",
    "Lunch",
    "Starters",
    "Fast Food",
    "Pizza",
    "Beverages",
    "Desserts",
    "Ice Cream",
  ];

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get("/customer/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  };


  const filteredMenu =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === selectedCategory
        );


  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>🍽 Loading delicious food...</h3>
      </div>
    );
  }


  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >

      <div className="container">


        <h1 className="text-center fw-bold mb-2">
          🍽 Explore Our Menu
        </h1>

        <p className="text-center text-muted mb-4">
          Choose your favourite dishes and order instantly
        </p>



        {/* Categories */}

        <div className="text-center mb-5">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="btn m-1"
              style={{
                borderRadius: "25px",
                padding: "10px 20px",
                background:
                  selectedCategory === category
                    ? "#ff5e62"
                    : "white",
                color:
                  selectedCategory === category
                    ? "white"
                    : "#333",
                border:
                  "1px solid #ff5e62",
                fontWeight: "600",
              }}
            >
              {category}
            </button>

          ))}

        </div>




        <div className="row">


          {filteredMenu.length === 0 ? (

            <div className="col-12">

              <div className="alert alert-warning text-center">
                No items available in this category.
              </div>

            </div>


          ) : (

            filteredMenu.map((item) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item.id}
              >


                <div
                  className="card border-0 shadow h-100"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "0.3s",
                  }}

                  onMouseEnter={(e) =>
                    e.currentTarget.style.transform =
                      "translateY(-8px)"
                  }

                  onMouseLeave={(e) =>
                    e.currentTarget.style.transform =
                      "translateY(0)"
                  }
                >



                  {/* Food Header */}

                  <div
                    className="text-center"
                    style={{
                      height: "130px",
                      background:
                        "linear-gradient(135deg,#ff9966,#ff5e62)",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      fontSize:"65px",
                    }}
                  >
                    🍛
                  </div>




                  <div className="card-body p-4">


                    <h3 className="fw-bold">
                      {item.name}
                    </h3>


                    <p className="text-muted">
                      {item.description}
                    </p>



                    <div className="d-flex justify-content-between mb-3">

                      <span
                        className="badge"
                        style={{
                          background:"#ffe0b2",
                          color:"#e65100",
                          padding:"8px",
                        }}
                      >
                        {item.category}
                      </span>


                      <span
                        className="fw-bold"
                        style={{
                          color:"#ff5e62",
                          fontSize:"20px",
                        }}
                      >
                        ₹{item.price}
                      </span>


                    </div>





                    <div className="mb-3">

                      {item.vegetarian ? (

                        <span className="badge bg-success me-2">
                          🥗 Veg
                        </span>

                      ) : (

                        <span className="badge bg-danger me-2">
                          🍗 Non Veg
                        </span>

                      )}



                      {item.spicy && (

                        <span className="badge bg-warning text-dark">
                          🌶 Spicy
                        </span>

                      )}

                    </div>




                    <div className="mb-3">

                      {item.available ? (

                        <span className="badge bg-success">
                          ✓ Available
                        </span>

                      ) : (

                        <span className="badge bg-secondary">
                          Not Available
                        </span>

                      )}

                    </div>




                    <button
                      className="btn w-100 text-white"
                      disabled={!item.available}
                      style={{
                        background:
                          "linear-gradient(to right,#ff9966,#ff5e62)",
                        borderRadius:"25px",
                        padding:"10px",
                        fontWeight:"600",
                      }}

                      onClick={() => {

                        addToCart(item);

                        alert(
                          `${item.name} added to cart!`
                        );

                      }}
                    >
                      🛒 Add to Cart
                    </button>


                  </div>


                </div>


              </div>

            ))

          )}


        </div>

      </div>

    </div>
  );
}

export default Menu;