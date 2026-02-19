// ==================== Product Data ====================
const products = [
    { id: 1, name: "Silk Saree Red", price: 2999, rating: 4.5, image: "img/l1.jpeg" },
    { id: 2, name: "Banarasi Saree Gold", price: 4999, rating: 5, image: "img/l2.jpeg" },
    { id: 3, name: "Cotton Saree Blue", price: 1499, rating: 4, image: "img/l3.jpeg" },
    { id: 4, name: "Designer Saree Purple", price: 3499, rating: 4.5, image: "img/l4.jpeg" },
    { id: 5, name: "Kanjivaram Saree Pink", price: 5499, rating: 5, image: "img/l5.jpeg" },
    { id: 6, name: "Chiffon Saree Green", price: 1999, rating: 4, image: "img/l6.jpeg" },
    { id: 7, name: "Georgette Saree Orange", price: 2499, rating: 4.5, image: "img/l7.jpeg" },
    { id: 8, name: "Net Saree Yellow", price: 2999, rating: 4, image: "img/l8.jpeg" },
    { id: 9, name: "Tussar Silk Saree", price: 3999, rating: 4.5, image: "img/l1.jpeg" },
    { id: 10, name: "Embroidered Saree", price: 4499, rating: 5, image: "img/l2.jpeg" },
    { id: 11, name: "Bandhani Saree", price: 2299, rating: 4, image: "img/l3.jpeg" },
    { id: 12, name: "Patola Saree", price: 6999, rating: 5, image: "img/l4.jpeg" },
    { id: 13, name: "Printed Saree", price: 1299, rating: 3.5, image: "img/l5.jpeg" },
    { id: 14, name: "Party Wear Saree", price: 3999, rating: 4.5, image: "img/l6.jpeg" },
    { id: 15, name: "Bridal Saree", price: 8999, rating: 5, image: "img/l7.jpeg" },
    { id: 16, name: "Casual Saree", price: 999, rating: 4, image: "img/l8.jpeg" },
    { id: 17, name: "Traditional Saree", price: 3499, rating: 4.5, image: "img/l1.jpeg" },
    { id: 18, name: "Handloom Saree", price: 2799, rating: 4.5, image: "img/l2.jpeg" },
    { id: 19, name: "Jamdani Saree", price: 4299, rating: 5, image: "img/l3.jpeg" },
    { id: 20, name: "Chanderi Saree", price: 3199, rating: 4, image: "img/l4.jpeg" }
];

// ==================== Global State ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';

body.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const theme = body.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== Mobile Menu ====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ==================== Navigation ====================
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active-page');
    });
    
    // Show selected page
    document.getElementById(page).classList.add('active-page');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Close mobile menu
    navLinks.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ==================== Load Products ====================
function loadFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    const featured = products.slice(0, 4);
    
    grid.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function loadLatestProducts() {
    const grid = document.getElementById('latestGrid');
    const latest = products.slice(4, 12);
    
    grid.innerHTML = latest.map(product => createProductCard(product)).join('');
}

function loadAllProducts() {
    const grid = document.getElementById('allProductsGrid');
    grid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const stars = generateStars(product.rating);
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${stars}</div>
            <p class="price">₹${product.price.toLocaleString()}</p>
            <button class="btn btn-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// ==================== Cart Functionality ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showPopup('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        loadCartItems();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartSummary(0, 0, 0);
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    updateCartSummary(subtotal, tax, total);
}

function updateCartSummary(subtotal, tax, total) {
    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `₹${tax.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
}

// ==================== Sorting ====================
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', (e) => {
    const sortType = e.target.value;
    let sortedProducts = [...products];
    
    switch(sortType) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            sortedProducts = products;
    }
    
    const grid = document.getElementById('allProductsGrid');
    grid.innerHTML = sortedProducts.map(product => createProductCard(product)).join('');
});

// ==================== Authentication ====================
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Check if user already exists
    if (users.find(u => u.username === username)) {
        showPopup('Username already exists!');
        return false;
    }
    
    if (users.find(u => u.email === email)) {
        showPopup('Email already registered!');
        return false;
    }
    
    // Add new user
    const newUser = {
        id: Date.now(),
        username,
        email,
        password // In real app, this should be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showPopup('Registration successful! Please login.');
    
    // Clear form and switch to login
    document.getElementById('registerForm').reset();
    switchToLogin(e);
    
    return false;
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = { id: user.id, username: user.username, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showPopup(`Welcome back, ${user.username}!`);
        document.getElementById('loginForm').reset();
    } else {
        showPopup('Invalid username or password!');
    }
    
    return false;
}

function switchToRegister(e) {
    e.preventDefault();
    document.querySelector('.login-form').classList.remove('active-form');
    document.querySelector('.register-form').classList.add('active-form');
}

function switchToLogin(e) {
    e.preventDefault();
    document.querySelector('.register-form').classList.remove('active-form');
    document.querySelector('.login-form').classList.add('active-form');
}

// ==================== Popup ====================
function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    
    popupMessage.textContent = message;
    popup.classList.add('active');
    
    setTimeout(() => {
        closePopup();
    }, 3000);
}

function closePopup() {
    document.getElementById('popup').classList.remove('active');
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadLatestProducts();
    loadAllProducts();
    updateCartCount();
    loadCartItems();
    
    // Set home as active page
    navigateTo('home');
});

console.log('Anita Creation - E-commerce Website Loaded Successfully! 🛍️');