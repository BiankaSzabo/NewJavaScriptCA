import { calculateTotal } from "./utils.js";

const d = document;
d.addEventListener('DOMContentLoaded', () => {
  const submitBtn = d.getElementById('submit-btn');
  const total = calculateTotal();
  submitBtn.textContent = `Pay kr. ${total.toFixed(2)}`;
});

