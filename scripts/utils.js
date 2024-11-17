export const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [];
  }
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

export const removeFromCart = (productId) => {
  let cart = getCart();
  const index = cart.findIndex(product => product.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const calculateTotal = () => {
  const cart = getCart();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
};