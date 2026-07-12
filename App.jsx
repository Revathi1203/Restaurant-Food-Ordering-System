import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./auth/Login";
import ProtectedAdmin from "./auth/ProtectedAdmin";

import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import AISearch from "./pages/customer/AISearch";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";

import Dashboard from "./pages/admin/Dashboard";
import ManageMenu from "./pages/admin/ManageMenu";
import ManageOrders from "./pages/admin/ManageOrders";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar on Login page */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Customer Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/search" element={<AISearch />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />

        {/* Protected Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdmin>
              <Dashboard />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/menu"
          element={
            <ProtectedAdmin>
              <ManageMenu />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <ManageOrders />
            </ProtectedAdmin>
          }
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;