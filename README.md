# 🛍️ Anita Creation — Traditional Saree E-Commerce Website

A fully responsive, single-page e-commerce website built with vanilla HTML, CSS, and JavaScript, showcasing a traditional Indian saree collection.

---
## [demo](https://d78e-com-anita-creation.netlify.app/)
## 🌟 Features

- **Multi-page SPA navigation** — Home, Products, About, Account, and Cart pages without any page reload
- **Product catalog** — 20 sarees with name, price, rating, and image
- **Featured & Latest sections** — Curated product highlights on the homepage
- **Sorting** — Sort products by price (low to high / high to low) or by rating
- **Shopping cart** — Add, remove, and update item quantities with live subtotal, 5% tax, and total calculation
- **User authentication** — Register and login with localStorage-based user management
- **Dark / Light theme toggle** — Persisted across sessions via localStorage
- **Responsive design** — Mobile-friendly with a hamburger menu
- **Toast popups** — User feedback for cart actions, auth events, and more
- **Brand logos & promotional banner** — Salwar Suit section and partner brand showcase

---

## 📁 Project Structure

```
anita-creation/
│
├── index.html        # Main HTML file (all pages as sections)
├── style.css         # Stylesheet (light/dark themes, responsive layout)
├── script.js         # All JavaScript logic (products, cart, auth, navigation)
│
└── img/
    ├── logo1.png         # Brand logo
    ├── l1.jpeg – l8.jpeg # Product images
    ├── c1.jpeg – c3.jpeg # Showcase banner images
    ├── salwar2.jpg       # Salwar Suit promo image
    ├── blogo1–5.png      # Brand partner logos
    ├── play-store.png    # Google Play badge
    └── app-store.png     # App Store badge
```

---

## 🚀 Getting Started

### Prerequisites

No build tools or dependencies required. Just a modern web browser.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/DHRUV7801/anita-creation.git
   cd anita-creation
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```
   Or use a local development server (recommended to avoid CORS issues with images):
   ```bash
   # Using VS Code Live Server extension, or:
   npx serve .
   ```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, CSS variables for theming, Flexbox & Grid |
| Vanilla JavaScript | DOM manipulation, cart logic, auth, routing |
| Font Awesome 6 | Icons (cart, stars, social, etc.) |
| localStorage | Cart persistence, user accounts, theme preference |

---

## 📸 Pages Overview

| Page | Description |
|---|---|
| **Home** | Hero banner, saree showcase, featured products, latest products, salwar promo, brand logos |
| **Products** | Full 20-product grid with sorting options |
| **About** | Store story, contact info (address, phone, email, hours) |
| **Account** | Login and Register forms with validation |
| **Cart** | Cart items with quantity controls, price summary, and checkout button |

---

## ⚙️ Key Functions (script.js)

| Function | Description |
|---|---|
| `navigateTo(page)` | SPA-style navigation between sections |
| `loadFeaturedProducts()` | Renders first 4 products on homepage |
| `loadAllProducts()` | Renders all 20 products on Products page |
| `addToCart(id)` | Adds product to cart or increments quantity |
| `removeFromCart(id)` | Removes item from cart |
| `updateQuantity(id, change)` | Increments or decrements cart item quantity |
| `handleLogin(e)` | Authenticates user against localStorage records |
| `handleRegister(e)` | Creates new user and saves to localStorage |
| `showPopup(message)` | Displays toast notification for 3 seconds |
| `updateThemeIcon()` | Syncs theme toggle icon with current theme |

---

## 🔒 Notes on Authentication

User credentials are stored in **localStorage** for demonstration purposes. This is **not suitable for production**. In a real application, authentication should be handled server-side with hashed passwords and secure sessions.

---

## 📱 Responsive Breakpoints

- **Desktop** — Full multi-column grid layout
- **Tablet** — Adjusted grid columns
- **Mobile** — Single column layout with hamburger navigation menu

---

## 🙏 Credits

- Icons by [Font Awesome](https://fontawesome.com/)
- Developed as a frontend project for **Anita Creation**, a traditional Indian saree brand.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> © 2025 Anita Creation. All Rights Reserved.
