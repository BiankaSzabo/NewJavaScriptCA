import { getUniqueProduct } from './api.js';
import { addToCart } from './utils.js';

const d = document;

const createItem = (product) => {
  const itemCont = d.createElement('div');
  itemCont.classList.add('item-cont');
  itemCont.id = 'item-cont';

  const itemDescription = d.createElement('div');
  itemDescription.classList.add('item-description');


  const img = d.createElement('img');
  img.src = product.image.url;
  img.alt = product.image.alt;


  const title = d.createElement('h2');
  title.textContent = product.title;


  const description = d.createElement('p');
  description.textContent = product.description;

  itemDescription.appendChild(img);
  itemDescription.appendChild(title);
  itemDescription.appendChild(description);

  const form = d.createElement('form');
  form.action = 'payment.html';
  form.classList.add('form-item-prop');

  const select = d.createElement('select');
  select.name = 'size';
  select.id = `size-select-${product.id}`;

  const defaultOption = d.createElement('option');
  defaultOption.value = 'select';
  defaultOption.textContent = 'Select size';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  product.sizes.forEach(size => {
    const option = d.createElement('option');
    option.value = size;
    option.textContent = size;
    select.appendChild(option);
  });


  const button = d.createElement('button');
  button.type = 'button';
  button.textContent = 'Add to cart';
  button.dataset.productId = product.id;
  button.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product);
  });

  const deliveryDiv = d.createElement('div');

  const checkmarkImg = d.createElement('img');
  checkmarkImg.src = './assets/item/checkmark-icon.svg';
  checkmarkImg.alt = 'Checkmark icon';

  const deliveryText = d.createElement('p');
  deliveryText.textContent = 'Home delivery';

  deliveryDiv.appendChild(checkmarkImg);
  deliveryDiv.appendChild(deliveryText);

  form.appendChild(select);
  form.appendChild(button);
  form.appendChild(deliveryDiv);

  itemCont.appendChild(itemDescription);
  itemCont.appendChild(form);

  return itemCont;
}

const renderProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const product = await getUniqueProduct(id);

  const itemContainer = d.getElementById('main-cont');
  const item = createItem(product.data);
  itemContainer.appendChild(item);
};

d.addEventListener("DOMContentLoaded", async () => {
  await renderProduct();
});