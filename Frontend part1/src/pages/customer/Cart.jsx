import { useEffect, useState } from "react";
import { placeOrder } from "../../services/api";
import {
  getCart,
  removeFromCart,
  clearCart,
} from "../../services/cart";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);


  const loadCart = () => {
    setCart(getCart());
  };


  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };


  const handleClear = () => {
    clearCart();
    loadCart();
  };


  const handlePlaceOrder = async () => {

    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }


    const customerName = prompt(
      "Enter your name:"
    );


    if (!customerName) {
      return;
    }


    const orderData = {

      customer_name: customerName,

      items: cart.map((item) => ({

        menu_id: item.id,

        quantity: item.quantity,

        price: item.price,

      })),

    };


    try {

      const response = await placeOrder(orderData);


      alert(
        `Order placed successfully!\nOrder ID: ${response.data.id}`
      );


      clearCart();

      loadCart();


    } catch(error){

      console.error(error);

      alert("Failed to place order.");

    }

  };



  const total = cart.reduce(
    (sum,item)=>
      sum + item.price * item.quantity,
    0
  );



  return (

    <div
      className="container-fluid py-5"
      style={{
        minHeight:"100vh",
        background:"#f8f9fa"
      }}
    >


      <div className="container">


        <h1 className="text-center fw-bold mb-5">
          🛒 Your Cart
        </h1>



        {cart.length === 0 ? (

          <div
            className="alert alert-warning text-center shadow"
            style={{
              borderRadius:"15px"
            }}
          >
            Your cart is empty 🍽️
          </div>


        ) : (


          <div className="row">


            {/* CART ITEMS */}

            <div className="col-lg-8">


              <div className="card shadow border-0"
                style={{
                  borderRadius:"20px"
                }}
              >


                <div className="card-body">


                  {cart.map((item)=>(


                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center border-bottom py-3"
                    >


                      <div>

                        <h5 className="fw-bold">
                          🍛 {item.name}
                        </h5>

                        <p className="text-muted mb-0">
                          ₹{item.price} × {item.quantity}
                        </p>

                      </div>



                      <div>

                        <h5 className="text-danger">
                          ₹{item.price * item.quantity}
                        </h5>


                        <button

                          className="btn btn-outline-danger btn-sm"

                          onClick={() =>
                            handleRemove(item.id)
                          }

                        >

                          Remove

                        </button>


                      </div>


                    </div>


                  ))}


                </div>


              </div>


            </div>




            {/* TOTAL CARD */}


            <div className="col-lg-4 mt-4 mt-lg-0">


              <div
                className="card shadow border-0"
                style={{
                  borderRadius:"20px"
                }}
              >

                <div className="card-body text-center">


                  <h3 className="fw-bold mb-4">
                    Order Summary
                  </h3>


                  <h2
                    style={{
                      color:"#ff5e62"
                    }}
                  >
                    ₹{total}
                  </h2>


                  <p className="text-muted">
                    Total Amount
                  </p>



                  <button

                    className="btn btn-warning w-100 mb-3"

                    style={{
                      borderRadius:"25px",
                      fontWeight:"600"
                    }}

                    onClick={handleClear}

                  >

                    🗑 Clear Cart

                  </button>




                  <button

                    className="btn text-white w-100"

                    style={{
                      background:
                      "linear-gradient(to right,#ff9966,#ff5e62)",
                      borderRadius:"25px",
                      fontWeight:"600"
                    }}

                    onClick={handlePlaceOrder}

                  >

                    🍽 Place Order

                  </button>



                </div>


              </div>


            </div>


          </div>


        )}


      </div>


    </div>

  );

}

export default Cart;