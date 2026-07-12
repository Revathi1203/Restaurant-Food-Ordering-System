import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logout } from "../auth/auth";

function Navbar() {
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navStyle = ({ isActive }) => ({
    color: isActive ? "#ffb703" : "white",
    fontWeight: isActive ? "bold" : "500",
    marginRight: "15px",
    textDecoration: "none",
    transition: "0.3s",
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: "linear-gradient(to right, #2c3e50, #1f2937)",
        padding: "12px 0",
      }}
    >
      <div className="container">

        <NavLink
          className="navbar-brand fw-bold fs-4"
          to={role === "admin" ? "/admin/dashboard" : "/menu"}
          style={{ color: "#ffb703" }}
        >
          🍽 Food Ordering System
        </NavLink>

        <div className="navbar-nav ms-auto align-items-center">

          {/* CUSTOMER NAVBAR */}

          {role === "customer" && (
            <>
              <NavLink to="/home" style={navStyle}>
                Home
              </NavLink>

              <NavLink to="/menu" style={navStyle}>
                Menu
              </NavLink>

              <NavLink to="/search" style={navStyle}>
                AI Search
              </NavLink>

              <NavLink to="/cart" style={navStyle}>
                Cart
              </NavLink>

              <NavLink to="/orders" style={navStyle}>
                Orders
              </NavLink>
            </>
          )}

          {/* ADMIN NAVBAR */}

          {role === "admin" && (
            <>
              <NavLink to="/admin/dashboard" style={navStyle}>
                Dashboard
              </NavLink>

              <NavLink to="/admin/menu" style={navStyle}>
                Manage Menu
              </NavLink>

              <NavLink to="/admin/orders" style={navStyle}>
                Manage Orders
              </NavLink>

              <NavLink to="/menu" style={navStyle}>
                Customer View
              </NavLink>
            </>
          )}

          {role && (
            <button
              onClick={handleLogout}
              className="btn ms-3"
              style={{
                background: "#ff5e62",
                color: "white",
                borderRadius: "8px",
                padding: "6px 18px",
                border: "none",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;