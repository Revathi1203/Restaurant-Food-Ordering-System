import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {

  const [data, setData] = useState(null);


  useEffect(() => {
    fetchDashboard();
  }, []);



  const fetchDashboard = async () => {

    try {

      const response = await api.get("/dashboard/");

      setData(response.data);


    } catch(error){

      console.error(error);

      alert("Failed to load dashboard.");

    }

  };



  if(!data){

    return (

      <div className="container py-5 text-center">

        <h3>
          📊 Loading Dashboard...
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

          📊 Admin Dashboard

        </h1>





        {/* Revenue Card */}


        <div className="row mb-4">


          <div className="col-md-4">


            <div

              className="card border-0 shadow text-center"

              style={{
                borderRadius:"20px",
                background:
                "linear-gradient(135deg,#11998e,#38ef7d)",
                color:"white"
              }}

            >


              <div className="card-body p-4">


                <h5>
                  💰 Today's Revenue
                </h5>


                <h1 className="fw-bold">

                  ₹{data.today_revenue}

                </h1>


              </div>


            </div>


          </div>



        </div>






        {/* Orders Status */}



        <div className="card border-0 shadow mb-5"
          style={{
            borderRadius:"20px"
          }}
        >


          <div className="card-body">


            <h3 className="fw-bold mb-4">

              📦 Orders By Status

            </h3>



            <div className="row">


              {Object.entries(
                data.orders_by_status
              ).map(([status,count])=>(



                <div
                  className="col-md-3 mb-3"
                  key={status}
                >



                  <div

                    className="card text-center border-0 shadow-sm"

                    style={{
                      borderRadius:"15px"
                    }}

                  >


                    <div className="card-body">


                      <h5>
                        {status}
                      </h5>


                      <h2
                        style={{
                          color:"#ff5e62"
                        }}
                      >

                        {count}

                      </h2>


                    </div>


                  </div>



                </div>



              ))}



            </div>


          </div>


        </div>








        {/* Popular Items */}



        <div

          className="card border-0 shadow"

          style={{
            borderRadius:"20px"
          }}

        >



          <div className="card-body">


            <h3 className="fw-bold mb-4">

              🍽 Popular Items

            </h3>




            {data.popular_items.length === 0 ? (

              <div className="alert alert-info">

                No orders yet.

              </div>


            ) : (



              <div className="table-responsive">


                <table className="table align-middle">


                  <thead className="table-dark">

                    <tr>

                      <th>
                        Menu Item
                      </th>

                      <th>
                        Total Orders
                      </th>

                    </tr>


                  </thead>



                  <tbody>


                    {data.popular_items.map(
                      (item,index)=>(


                      <tr key={index}>


                        <td>
                          🍛 {item.name}
                        </td>


                        <td>

                          <span className="badge bg-success">

                            {item.orders} Orders

                          </span>


                        </td>


                      </tr>


                    ))}


                  </tbody>


                </table>


              </div>


            )}



          </div>


        </div>




      </div>


    </div>


  );

}


export default Dashboard;