const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('no-results');
const searchQueryElement = document.getElementById('searchQuery');
const categoryContainer = document.querySelector('.categories');
const clearFiltersDiv = document.querySelector('.clear-filters');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const slider = document.getElementById('image-slider');
const gallerySection = document.getElementById('gallery-section'); 
const categoriesMain = document.querySelector('.categories-main'); 
const cartButton = document.getElementById('cart-button');
const closeCartButton = document.getElementById('close-cart-button');
const cartModal = document.getElementById('cart');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCounter = document.getElementById('cart-counter');
const aboutSections = document.querySelectorAll('.about');

let selectedCategory = null;
const cart = []; 

function renderProducts(products) {
  productGrid.innerHTML = '';

  if (products.length > 0) {
    noResults.style.display = 'none';
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <div class="icon">
          <img src="${product.image}" alt="${product.name}">
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Añadir al Carrito</button>
        </div>
        <h3 class="ProductName">${product.name}</h3>
        <p class="ProductPrice">S/ ${product.price.toFixed(2)}</p>
      `;
      productGrid.appendChild(productCard);
    });
  } else {
    noResults.style.display = 'block';
    searchQueryElement.textContent = searchInput.value;
  }
}

function updateVisibility(query) {
  const hasSearchQuery = query.trim() !== '';

  slider.classList.toggle('hidden', hasSearchQuery);
  categoriesMain.classList.toggle('hidden', hasSearchQuery);
  gallerySection.classList.toggle('hidden', hasSearchQuery);
  aboutSections.forEach(element => {
    element.classList.toggle('hidden', hasSearchQuery);
  });
}


function searchProducts(query) {
  const searchQuery = query.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) &&
    (selectedCategory ? product.categoryId === selectedCategory : true)
  );

  renderProducts(filteredProducts);
  updateVisibility(query);

  noResults.style.display = filteredProducts.length === 0 ? 'block' : 'none';
}

function filterProducts() {
  searchProducts(searchInput.value);
}

searchInput.addEventListener('input', filterProducts);

function selectCategory(categoryId, element) {
  document.querySelectorAll('.category-item').forEach(item => {
      item.classList.remove('active');
  });

  element.classList.add('active');

  selectedCategory = categoryId;

  filterProducts();

  const clearButton = document.getElementById('clearButton');
  clearButton.style.display = 'flex'; 
}

function clearCategory() {
  selectedCategory = null;
  document.querySelectorAll('.category-item').forEach(item => {
      item.classList.remove('active');
  });

  searchInput.value = ''; 
  searchProducts(''); 

    const clearButton = document.getElementById('clearButton');
    clearButton.style.display = 'none'; 
  
  searchQueryElement.textContent = '';
}





function addToCart(productId) {
  const productToAdd = products.find(product => product.id === productId);

  if (!productToAdd) return;

  const productInCart = cart.find(item => item.id === productId);

  if (productInCart) {

    productInCart.quantity += 1;
  } else {
    cart.push({ ...productToAdd, quantity: 1 });
  }

  updateCartDisplay();
  animateCart();
}

function updateCartDisplay() {
  cartItemsElement.innerHTML = ''; 
  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image">
      <div class="item-details">
        <h4>${item.name}</h4>
        <p class="item-price">S/ ${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    cartItemsElement.appendChild(listItem);

    total += item.price * item.quantity;
  });


  cartTotalElement.textContent = `Total: S/ ${total.toFixed(2)}`;

  cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.classList.add('bounce');
  setTimeout(() => cartCounter.classList.remove('bounce'), 600);
}

function changeQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
    }
  }
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1); 
  }

  updateCartDisplay();
}

function animateCart() {
  cartModal.classList.add('cart-slide-enter');
  setTimeout(() => cartModal.classList.remove('cart-slide-enter'), 300);
}

function openCart() {
  cartModal.classList.remove('hidden');
  animateCart();
}

function closeCart() {
  cartModal.classList.add('cart-slide-leave-to');
  setTimeout(() => {
    cartModal.classList.remove('cart-slide-leave-to');
    cartModal.classList.add('hidden');
  }, 300);
}

cartButton.addEventListener('click', openCart);

closeCartButton.addEventListener('click', closeCart);

renderProducts(products);

document.querySelectorAll('.nav-container .pag ul li').forEach((item, index) => {
  item.addEventListener('click', () => {
    const sections = ['.image-slider', '.gal', '.about', 'footer'];
    const targetSection = document.querySelector(sections[index]);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



function redirectToPayment() {
  window.location.href = 'pago.html';  // Redirige a la página de pago
}
document.getElementById('payment-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
  // Puedes manejar cada opción de pago aquí
  if (selectedPaymentMethod === 'tarjeta') {
      alert('Redirigiendo al pago con tarjeta...');
      // Redirigir a la pasarela de pago de tarjeta
  } else if (selectedPaymentMethod === 'paypal') {
      alert('Redirigiendo a PayPal...');
      // Redirigir a PayPal
  } else if (selectedPaymentMethod === 'banco') {
      alert('Instrucciones para transferencia bancaria...');
      // Mostrar instrucciones para pago bancario
  }
});