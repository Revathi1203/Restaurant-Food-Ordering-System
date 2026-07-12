import { useEffect, useState } from "react";
import {
  getAdminMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/api";

function ManageMenu() {
  const emptyForm = {
    name: "",
    description: "",
    category: "",
    price: "",
    vegetarian: false,
    non_vegetarian: false,
    spicy: false,
    available: true,
  };

  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await getAdminMenu();
      setMenu(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load menu.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
    };

    try {
      if (editingId) {
        await updateMenuItem(editingId, payload);
        alert("Menu item updated.");
      } else {
        await addMenuItem(payload);
        alert("Menu item added.");
      }

      resetForm();
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("Operation failed.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      vegetarian: item.vegetarian,
      non_vegetarian: item.non_vegetarian,
      spicy: item.spicy,
      available: item.available,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      await deleteMenuItem(id);
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🍴 Manage Menu</h2>

      <form onSubmit={handleSubmit} className="card p-4 mb-5">
        <div className="row">

          {/* Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>

            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>

            <select
              className="form-select"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              <option value="Tiffins">🥞 Tiffins</option>
              <option value="Lunch">🍛 Lunch</option>
              <option value="Starters">🍗 Starters</option>
              <option value="Fast Food">🍔 Fast Food</option>
              <option value="Pizza">🍕 Pizza</option>
              <option value="Beverages">🥤 Beverages</option>
              <option value="Desserts">🍰 Desserts</option>
              <option value="Ice Cream">🍨 Ice Cream</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>

            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Price</label>

            <input
              type="number"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="col-md-8 d-flex align-items-center flex-wrap">

            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="vegetarian"
                checked={form.vegetarian}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Vegetarian
              </label>
            </div>

            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="non_vegetarian"
                checked={form.non_vegetarian}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Non Vegetarian
              </label>
            </div>

            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="spicy"
                checked={form.spicy}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Spicy
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="available"
                checked={form.available}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Available
              </label>
            </div>

          </div>

        </div>

        <div className="mt-3">

          <button className="btn btn-success me-2">
            {editingId ? "Update Item" : "Add Item"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset
          </button>

        </div>

      </form>

      <h3 className="mb-3">Menu Items</h3>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {menu.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No menu items found.
              </td>
            </tr>
          ) : (
            menu.map((item) => (
              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>₹{item.price}</td>

                <td>
                  {item.available ? (
                    <span className="badge bg-success">
                      Available
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Unavailable
                    </span>
                  )}
                </td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default ManageMenu;