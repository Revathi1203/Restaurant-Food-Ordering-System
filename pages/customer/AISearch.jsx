import { useState } from "react";
import { searchMenu } from "../../services/api";

function AISearch() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);



  const handleSearch = async () => {

    if (!query.trim()) {

      alert("Please enter a search query.");

      return;

    }


    setLoading(true);


    try {

      const response = await searchMenu(query);

      setResults(response.data);


    } catch(error){

      console.error(error);

      alert("Search failed.");

    }
    finally{

      setLoading(false);

    }

  };



  return (

    <div
      className="container-fluid py-5"
      style={{
        background:"#f8f9fa",
        minHeight:"100vh"
      }}
    >


      <div className="container">


        {/* Header */}


        <div
          className="text-center mb-5"
        >

          <h1 className="fw-bold">

            🤖 AI Food Assistant

          </h1>


          <p className="text-muted fs-5">

            Describe what you want, and AI will find the best dishes for you.

          </p>


        </div>





        {/* Search Box */}


        <div
          className="card shadow border-0 p-4 mb-4"
          style={{
            borderRadius:"20px"
          }}
        >


          <div className="input-group">


            <input

              type="text"

              className="form-control form-control-lg"

              placeholder="Example: spicy vegetarian food under 200 rupees"

              value={query}

              onChange={(e)=>setQuery(e.target.value)}

            />



            <button

              className="btn text-white"

              style={{
                background:
                "linear-gradient(to right,#ff9966,#ff5e62)",
                padding:"0 30px"
              }}

              onClick={handleSearch}

            >

              🔍 Search

            </button>


          </div>


        </div>





        {/* Example Queries */}


        <div className="text-center mb-5">


          <p className="fw-bold">
            Try searching:
          </p>


          <span className="badge bg-warning text-dark m-1 p-2">

            🌶 spicy vegetarian under 200

          </span>


          <span className="badge bg-success m-1 p-2">

            🥗 healthy lunch

          </span>


          <span className="badge bg-primary m-1 p-2">

            🍕 fast food

          </span>


          <span className="badge bg-danger m-1 p-2">

            🍰 sweet desserts

          </span>


        </div>





        {loading && (

          <div className="alert alert-info text-center">

            🤖 AI is finding the best matches...

          </div>

        )}







        {/* Results */}



        <div className="row">


          {results.length === 0 && !loading && (

            <div className="text-center text-muted">

              No results yet. Try searching for your favourite food.

            </div>

          )}



          {results.map((item)=>(



            <div
              className="col-md-4 mb-4"
              key={item.id}
            >



              <div
                className="card shadow border-0 h-100"
                style={{
                  borderRadius:"20px"
                }}
              >



                <div

                  className="text-center"

                  style={{
                    height:"120px",
                    background:
                    "linear-gradient(135deg,#ff9966,#ff5e62)",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    fontSize:"60px"
                  }}

                >

                  🍽

                </div>





                <div className="card-body">


                  <h4 className="fw-bold">

                    {item.name}

                  </h4>



                  <p className="text-muted">

                    {item.description}

                  </p>



                  <p>

                    🍴 <strong>Category:</strong>{" "}

                    {item.category}

                  </p>



                  <p>

                    💰 <strong>Price:</strong>{" "}

                    ₹{item.price}

                  </p>




                  <span
                    className="badge bg-success"
                    style={{
                      padding:"10px"
                    }}
                  >

                    🤖 Match Score:

                    {" "}

                    {(item.match_score * 100).toFixed(1)}%

                  </span>



                </div>


              </div>


            </div>



          ))}



        </div>



      </div>


    </div>


  );

}


export default AISearch;