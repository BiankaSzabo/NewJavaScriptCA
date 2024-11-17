import { getProducts } from "./api.js";
import { addToCart } from "./utils.js";

const d = document;
const filter = d.getElementById('gender-filter'); // Select DOM


const createProductCard = (product) => {
  const link = d.createElement('a');
  link.href = `item.html?id=${product.id}`;

  const article = d.createElement('article');
  article.classList.add('product');

  const img = d.createElement('img');
  img.src = product.image.url;
  img.alt = product.image.alt;

  const div = d.createElement('div');

  const title = d.createElement('h4');
  title.textContent = product.title;

  const price = d.createElement('p');
  price.textContent = `kr. ${product.price.toFixed(2)}`;

  const button = d.createElement('button');
  button.textContent = 'Add to Cart';
  button.dataset.productId = product.id;
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  });

  div.appendChild(title);
  div.appendChild(price);
  div.appendChild(button);

  article.appendChild(img);
  article.appendChild(div);

  link.appendChild(article);

  return link;
};

async function renderProducts() {
  const products = await getProducts();
  const productsContainer = d.getElementById('product-cont');
  const fragment = d.createDocumentFragment();

  const selectedGender = filter.value;
  let filteredProducts;
  if (selectedGender === 'all') {
    filteredProducts = products.data;
  } else {
    filteredProducts = [];
    for (let i = 0; i < products.data.length; i++) {
      if (products.data[i].gender.toLowerCase() === selectedGender) {
        filteredProducts.push(products.data[i]);
      }
    }
  }

  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    fragment.appendChild(productCard);
  });

  productsContainer.innerHTML = ''; // Clear previous products
  productsContainer.appendChild(fragment);
}


d.addEventListener("DOMContentLoaded", async () => {
  try {
    await renderProducts();
    filter.addEventListener('input', async () => {
      await renderProducts();
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
});