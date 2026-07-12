// Get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : [];
};

// Save cart
export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Add item
export const addToCart = (item) => {
  let cart = getCart();

  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart(cart);
};

// Remove item
export const removeFromCart = (id) => {
  let cart = getCart();

  cart = cart.filter((item) => item.id !== id);

  saveCart(cart);
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem("cart");
};