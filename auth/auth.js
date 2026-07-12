// Simple Authentication

export const login = (username, password) => {

  if (username === "admin" && password === "admin123") {

    localStorage.setItem("role", "admin");
    return "admin";

  }

  if (username === "customer" && password === "customer123") {

    localStorage.setItem("role", "customer");
    return "customer";

  }

  return null;

};

export const logout = () => {

  localStorage.removeItem("role");

};

export const getRole = () => {

  return localStorage.getItem("role");

};

export const isAdmin = () => {

  return getRole() === "admin";

};

export const isCustomer = () => {

  return getRole() === "customer";

};