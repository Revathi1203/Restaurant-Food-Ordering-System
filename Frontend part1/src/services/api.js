import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// =========================
// CUSTOMER APIs
// =========================

export const getMenu = () => api.get("/customer/menu");

export const searchMenu = (query) =>
  api.post(`/customer/search?query=${encodeURIComponent(query)}`);

// =========================
// ORDER APIs
// =========================

export const placeOrder = (orderData) =>
  api.post("/orders/", orderData);

// =========================
// ADMIN MENU APIs
// =========================

export const getAdminMenu = () =>
  api.get("/admin/menu");

export const addMenuItem = (menu) =>
  api.post("/admin/menu", menu);

export const updateMenuItem = (id, menu) =>
  api.put(`/admin/menu/${id}`, menu);

export const deleteMenuItem = (id) =>
  api.delete(`/admin/menu/${id}`);

export default api;