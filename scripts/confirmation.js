import { getCart, calculateTotal } from "./utils.js";

const d = document;

const createProductRow = (product) => {
  const tr = d.createElement('tr');

  const nameTd = d.createElement('td');
  nameTd.textContent = product.title;

  const priceTd = d.createElement('td');
  priceTd.textContent = `kr. ${product.price.toFixed(2)}`;

  tr.appendChild(nameTd);
  tr.appendChild(priceTd);

  return tr;
};


const renderConfirmation = () => {
  const cart = getCart();
  const tableBody = d.getElementById('confirmation-table-body');
  const fragment = d.createDocumentFragment();

  cart.forEach(product => {
    const productRow = createProductRow(product);
    fragment.appendChild(productRow);
  });

  tableBody.innerHTML = '';
  tableBody.appendChild(fragment);

  updateTotal();
};

const updateTotal = () => {
  const totalElement = d.getElementById('confirmation-total');
  const total = calculateTotal();
  totalElement.textContent = `Total: kr. ${total.toFixed(2)}`;
};


const handleConfirmPayment = () => {
  localStorage.removeItem('cart');

  window.location.href = 'success.html';
};

const setupConfirmPaymentButton = () => {
  const confirmButton = d.getElementById('confirm-payment-button');
  confirmButton.addEventListener('click', handleConfirmPayment);
};

d.addEventListener("DOMContentLoaded", () => {
  try {
    renderConfirmation();
    setupConfirmPaymentButton();
  } catch (error) {
    console.error("Error rendering payment confirmation:", error);
  }
});
