// Listas de productos
let coches = [
    { id: 1, name: "Toyota Corolla", price: 20000, image: "images/toyota-corolla.jpg", isFeatured: true },
    { id: 2, name: "Honda Civic", price: 21000, image: "images/honda-civic.jpg", isFeatured: false },
    { id: 3, name: "Ford Mustang", price: 22000, image: "images/ford-mustang.jpg", isFeatured: false },
    { id: 4, name: "Chevrolet Camaro", price: 23000, image: "images/chevrolet-camaro.jpg", isFeatured: false },
    { id: 5, name: "BMW 3 Series", price: 24000, image: "images/bmw-3series.jpg", isFeatured: false },
    { id: 6, name: "Audi A4", price: 25000, image: "images/audi-a4.jpg", isFeatured: false },
    { id: 7, name: "Mercedes-Benz C-Class", price: 26000, image: "images/mercedes-cclass.jpg", isFeatured: false },
    { id: 8, name: "Volkswagen Golf", price: 27000, image: "images/vw-golf.jpg", isFeatured: false },
    { id: 9, name: "Nissan Altima", price: 28000, image: "images/nissan-altima.jpg", isFeatured: false },
    { id: 10, name: "Kia Optima", price: 29000, image: "images/kia-optima.jpg", isFeatured: false }
  ];
  
  let accesorios = [
    { id: 101, name: "Llantas Alloy", price: 200, image: "images/llantas-alloy.jpg", isFeatured: false },
    { id: 102, name: "Tapicería de Cuero", price: 250, image: "images/tapiceria-cuero.jpg", isFeatured: false },
    { id: 103, name: "Sistema de Navegación", price: 300, image: "images/sistema-navegacion.jpg", isFeatured: false },
    { id: 104, name: "Cámara de Reversa", price: 350, image: "images/camara-reversa.jpg", isFeatured: false },
    { id: 105, name: "Faros LED", price: 400, image: "images/faros-led.jpg", isFeatured: false },
    { id: 106, name: "Parachoques Deportivo", price: 450, image: "images/parachoques-deportivo.jpg", isFeatured: false },
    { id: 107, name: "Suspensión Deportiva", price: 500, image: "images/suspension-deportiva.jpg", isFeatured: false },
    { id: 108, name: "Alerón Trasero", price: 550, image: "images/aleron-trasero.jpg", isFeatured: false },
    { id: 109, name: "Kit de Carrocería", price: 600, image: "images/kit-carroceria.jpg", isFeatured: false },
    { id: 110, name: "Sistema de Audio Premium", price: 650, image: "images/sistema-audio.jpg", isFeatured: false }
  ];
  
  let currentCategory = "coches";
  let cart = [];
  
  function loadProducts() {
    const cochesStored = localStorage.getItem('coches');
    const accesoriosStored = localStorage.getItem('accesorios');
    if (cochesStored && accesoriosStored) {
      coches = JSON.parse(cochesStored);
      accesorios = JSON.parse(accesoriosStored);
    } else {
      saveProducts();
    }
  }
  
  function saveProducts() {
    localStorage.setItem('coches', JSON.stringify(coches));
    localStorage.setItem('accesorios', JSON.stringify(accesorios));
  }
  
  function displayProductsCategory() {
    const productsContainer = document.querySelector('.products-container');
    const categoryTitle = document.getElementById('categoryTitle');
    if (!productsContainer || !categoryTitle) return;
  
    productsContainer.innerHTML = "";
    let productsToDisplay = currentCategory === "coches" ? coches : accesorios;
    categoryTitle.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
  
    productsToDisplay.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      const starIcon = product.isFeatured ? "★" : "☆";
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart(${product.id}, '${currentCategory}')">Agregar al Carrito</button>
        <span class="star" onclick="toggleFeatured(${product.id}, '${currentCategory}')">${starIcon}</span>
      `;
      productsContainer.appendChild(productDiv);
    });
  }
  
  function displayFeatured() {
    const featuredContainer = document.querySelector('.featured-container');
    if (!featuredContainer) return;
  
    featuredContainer.innerHTML = "";
    const featuredProducts = [...coches, ...accesorios].filter(prod => prod.isFeatured);
  
    featuredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      const starIcon = product.isFeatured ? "★" : "☆";
      const category = product.id <= 100 ? "coches" : "accesorios";
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart(${product.id}, '${category}')">Agregar al Carrito</button>
        <span class="star" onclick="toggleFeatured(${product.id}, '${category}')">${starIcon}</span>
      `;
      featuredContainer.appendChild(productDiv);
    });
  }
  
  function toggleFeatured(productId, category) {
    const product = (category === "coches" ? coches : accesorios).find(p => p.id === productId);
    if (product) {
      product.isFeatured = !product.isFeatured;
      saveProducts();
      displayProductsCategory();
      displayFeatured();
    }
  }
  
  function addToCart(productId, category) {
    const product = (category === "coches" ? coches : accesorios).find(p => p.id === productId);
    if (product) {
      cart.push(product);
      displayCart();
    }
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
  }
  
  function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    if (!cartContainer) return;
  
    cartContainer.innerHTML = cart.length ? cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>Precio: $${item.price}</p>
        </div>
        <button onclick="removeFromCart(${index})">Eliminar</button>
      </div>`).join('') : "<p>El carrito está vacío.</p>";
  
    updateCartCount();
  }
  
  function updateCartCount() {
    const countElement = document.getElementById('cartCount');
    if (countElement) countElement.textContent = cart.length;
  }
  
  // Eventos globales
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    if(document.querySelector('.products-container')) displayProductsCategory();
    if(document.querySelector('.featured-container')) displayFeatured();
    displayCart();
    updateCartCount();
  
    // Menú hamburguesa
    const dropdown = document.querySelector(".dropdown-content");
    document.getElementById("productsDropdown").onclick = e => {
      e.preventDefault();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    };
  
    document.getElementById("cochesLink").onclick = e => {
      e.preventDefault();
      currentCategory = "coches";
      displayProductsCategory();
      dropdown.style.display = "none";
    };
  
    document.getElementById("accesoriosLink").onclick = e => {
      e.preventDefault();
      currentCategory = "accesorios";
      displayProductsCategory();
      dropdown.style.display = "none";
    };
  
    // Modal carrito
    const modal = document.getElementById("cartModal");
    document.getElementById("cartLink").onclick = e => { e.preventDefault(); modal.style.display = "block"; displayCart(); };
    document.querySelector(".modal-content .close").onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
  
    // Botón compra
    document.getElementById('purchaseBtn').addEventListener('click', () => {
        if (cart.length > 0) {
          alert("¡Compra realizada con éxito!");
          cart = [];
          displayCart();
          updateCartCount();
        } else {
          alert("Tu carrito está vacío.");
        }
      });
      
});

  