import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const statusOptions = [
    "Placed",
    "Confirmed",
    "Preparing",
    "Ready",
    "Picked Up",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load orders.");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}?status=${encodeURIComponent(status)}`);

      alert("Order status updated.");

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order.");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">📦 Manage Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
        </div>
      ) : (
        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Update Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer_name}</td>

                <td>₹{order.total_price}</td>

                <td>

                  <span
                    className={`badge ${
                      order.status === "Placed"
                        ? "bg-secondary"
                        : order.status === "Confirmed"
                        ? "bg-primary"
                        : order.status === "Preparing"
                        ? "bg-warning text-dark"
                        : order.status === "Ready"
                        ? "bg-info text-dark"
                        : "bg-success"
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

                <td>
                  {new Date(order.created_at).toLocaleString()}
                </td>

                <td>

                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default ManageOrders;