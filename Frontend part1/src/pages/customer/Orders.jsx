import { useEffect, useState } from "react";
import api from "../../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchOrders();
  }, []);



  const fetchOrders = async () => {

    try {

      const response = await api.get("/orders/");

      setOrders(response.data);


    } catch(error){

      console.error(error);

      alert("Failed to load orders.");

    }
    finally{

      setLoading(false);

    }

  };



  const getStatusStyle = (status) => {

    switch(status){

      case "Placed":
        return "warning";

      case "Confirmed":
        return "primary";

      case "Preparing":
        return "orange";

      case "Ready":
        return "success";

      case "Picked Up":
        return "dark";

      default:
        return "secondary";

    }

  };



  if(loading){

    return (

      <div className="container py-5 text-center">

        <h3>
          📦 Loading Orders...
        </h3>

      </div>

    );

  }



  return (

    <div
      className="container-fluid py-5"
      style={{
        background:"#f8f9fa",
        minHeight:"100vh"
      }}
    >


      <div className="container">


        <h1 className="text-center fw-bold mb-5">
          📦 My Orders
        </h1>




        {orders.length === 0 ? (

          <div
            className="alert alert-info text-center"
            style={{
              borderRadius:"15px"
            }}
          >

            No orders found.

          </div>


        ) : (


          <div className="row">


            {orders.map((order)=>(


              <div
                className="col-md-6 mb-4"
                key={order.id}
              >


                <div
                  className="card shadow border-0 h-100"
                  style={{
                    borderRadius:"20px"
                  }}
                >


                  <div className="card-body p-4">



                    <div className="d-flex justify-content-between">


                      <h4 className="fw-bold">

                        🍽 Order #{order.id}

                      </h4>



                      <span
                        className={
                          `badge bg-${getStatusStyle(order.status)}`
                        }

                        style={{
                          padding:"10px"
                        }}
                      >

                        {order.status}

                      </span>


                    </div>



                    <hr />



                    <p>

                      👤 <strong>Customer:</strong>{" "}

                      {order.customer_name}

                    </p>



                    <p>

                      💰 <strong>Total:</strong>{" "}

                      <span
                        style={{
                          color:"#ff5e62",
                          fontWeight:"bold",
                          fontSize:"20px"
                        }}
                      >

                        ₹{order.total_price}

                      </span>

                    </p>




                    <p>

                      🕒 <strong>Ordered:</strong>{" "}

                      {new Date(
                        order.created_at
                      ).toLocaleString()}

                    </p>




                    <div className="mt-4">


                      <h6 className="fw-bold">
                        Order Progress
                      </h6>



                      <div className="d-flex justify-content-between mt-3">


                        <span>🟡</span>

                        <span>🔵</span>

                        <span>🟠</span>

                        <span>🟢</span>

                        <span>⚫</span>


                      </div>


                      <div
                        className="d-flex justify-content-between text-muted"
                        style={{
                          fontSize:"12px"
                        }}
                      >

                        <span>Placed</span>

                        <span>Confirmed</span>

                        <span>Preparing</span>

                        <span>Ready</span>

                        <span>Picked</span>


                      </div>


                    </div>



                  </div>


                </div>


              </div>


            ))}


          </div>


        )}


      </div>


    </div>


  );

}


export default Orders;