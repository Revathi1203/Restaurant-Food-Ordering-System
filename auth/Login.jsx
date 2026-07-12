import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const role = login(username, password);

    if (!role) {
      alert("Invalid Username or Password");
      return;
    }

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/menu");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "430px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">

            <div
              style={{
                width: "90px",
                height: "90px",
                margin: "auto",
                borderRadius: "50%",
                background: "#fff3e6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "42px",
              }}
            >
              🍽
            </div>

            <h2
              className="mt-3 fw-bold"
              style={{ color: "#ff5e62" }}
            >
              Food Ordering System
            </h2>

            <p className="text-muted">
              Welcome Back! Please Login
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            </div>

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-lg w-100 text-white"
              style={{
                background:
                  "linear-gradient(to right, #ff9966, #ff5e62)",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;