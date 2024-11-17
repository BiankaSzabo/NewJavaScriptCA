import { getCart, removeFromCart } from "./utils.js";

const d = document;
const totalElement = d.getElementById('cart-total');

const createCartCard = (product) => {
  const article = d.createElement('article');
  article.classList.add('product');

  const img = d.createElement('img');
  img.src = product.image.url;
  img.alt = product.image.alt;

  const div = d.createElement('div');

  const price = d.createElement('p');
  price.textContent = `kr. ${product.price.toFixed(2)}`;

  const button = d.createElement('button');
  button.textContent = 'Remove from cart';
  button.dataset.productId = product.id;
  button.addEventListener('click', () => {
    removeFromCart(product.id);
    renderCart();
  });

  div.appendChild(price);
  div.appendChild(button);

  article.appendChild(img);
  article.appendChild(div);

  return article;
};

const createCheckoutButton = () => {
  const button = d.createElement('button');
  button.textContent = 'Checkout';
  button.id = 'checkout-button';
  button.addEventListener('click', () => {
    window.location.href = 'payment.html';
  });
  return button;
};


const renderCart = () => {
  const cart = getCart();
  const cartContainer = d.getElementById('cart-container');
  const fragment = d.createDocumentFragment();

  cart.forEach(product => {
    const cartCard = createCartCard(product);
    fragment.appendChild(cartCard);
  });

  cartContainer.innerHTML = '';
  cartContainer.appendChild(fragment);

  updateTotal(cart);

  const cartSummary = d.getElementById('cart-summary');
  let checkoutButton = d.getElementById('checkout-button');

  if (cart.length > 0) {
    if (!checkoutButton) {
      checkoutButton = createCheckoutButton();
      cartSummary.appendChild(checkoutButton);
    }
  } else {
    if (checkoutButton) {
      checkoutButton.remove();
    }
    if (totalElement) {
      totalElement.textContent = '';
    }
    if (cartContainer) {
      cartContainer.innerHTML = '<h3>Your cart is empty, fill it up!</h3>';
    }
  }
};

const updateTotal = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  totalElement.textContent = `Total: kr. ${total.toFixed(2)}`;
};

d.addEventListener("DOMContentLoaded", () => {
  try {
    renderCart();
  } catch (error) {
    console.error("Error rendering the cart:", error);
  }
});
