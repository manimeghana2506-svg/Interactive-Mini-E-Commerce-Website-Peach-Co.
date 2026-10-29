# Peach & Co. — Aesthetic Mini E-Commerce Website

A beginner-friendly, warm, boutique mini e-commerce website designed with HTML, CSS, and vanilla JavaScript. "Peach & Co." represents a modern lifestyle boutique offering slow-living essentials such as hardcover notebooks, artisanal ceramic mugs, everyday canvas totes, and hand-poured scented candles.

---

## 🎨 Design & Aesthetic Theme

The design embraces a cozy, warm, and elevated boutique atmosphere built around a tailored peach-and-chocolate-brown color palette:

| Element | Color Code | Description |
| :--- | :--- | :--- |
| **Main Background** | `#FFF8F0` | Warm cream canvas |
| **Primary Peach** | `#F4B6A6` | Soft blush peach for accents and borders |
| **Light Peach** | `#FFE3D8` | Light peach for subtle section backgrounds and buttons |
| **Dark Chocolate Brown** | `#5C3D2E` | Deep chocolate brown for headings, buttons, and footer |
| **Medium Brown** | `#7B4B35` | Warm medium brown for descriptions and secondary text |
| **Terracotta Accent** | `#C8795A` | Rich terracotta for badges, icons, and highlights |
| **Pure White** | `#FFFFFF` | Crisp white for product cards and modal surfaces |
| **Main Text** | `#49352A` | High-contrast readable earthy dark brown |

Typography pairs the refined editorial serif **Cormorant Garamond** with the clean geometric sans-serif **Plus Jakarta Sans**.

---

## ✨ Features

1. **Sticky Header & Responsive Navigation**
   - Brand logo and navigation links with peach hover indicator lines.
   - Interactive shopping cart button with live numerical counter.
   - Mobile hamburger menu for responsive navigation across devices.

2. **Hero Section**
   - Headline: *"Little Things. Lovely Living."*
   - Engaging introduction to the boutique with organic peach backdrop blobs.
   - "Explore Collection" button with smooth scrolling directly to the product catalogue.
   - High-resolution lifestyle imagery.

3. **Products Catalogue (CSS Grid)**
   - Responsive CSS Grid featuring 4 boutique lifestyle goods:
     1. **Aesthetic Notebook** (₹649)
     2. **Ceramic Coffee Mug** (₹549)
     3. **Everyday Tote Bag** (₹899)
     4. **Scented Candle** (₹799)
   - Gentle lift hover animations and image zoom.
   - Dedicated "Add to Cart" action buttons.

4. **Shopping Cart Functionality**
   - **Counter**: Incrementing badge counter with bump micro-animation.
   - **Session Tracking Array**: Stores added products during the current session (`name`, `price`, `timestamp`).
   - **Feedback Toast**: Animated slide-down confirmation alert when an item is added.
   - **Boutique Bag Drawer**: Click the Cart button anytime to inspect added session items and the calculated total.

5. **FAQ Accordion**
   - Interactive accordion for frequently asked questions.
   - Click to open, click again to close.
   - Dynamic indicators (`+` / `−`) and smooth height transitions.

6. **Brand Story (About Section)**
   - Section heading: *"Made for Your Everyday Moments"*.
   - Highlights of boutique values: *Mindfully Sourced*, *Artisan Crafted*, and *Warm Minimalism*.

7. **Validated Contact Form**
   - Fields: Name, Email, and Message.
   - Input validation:
     - Required field checks.
     - Email regex validation (`name@domain.ext`).
     - Minimum length validation.
   - Clear inline feedback, error styling, and success banner upon valid submission.
   - Prevents page reload with `e.preventDefault()`.

8. **Boutique Footer**
   - Rich chocolate-brown background with cream typography, hours, and copyright.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3**: Vanilla CSS with Custom Properties (variables), CSS Grid, Flexbox, smooth transitions, and responsive media queries.
- **JavaScript (ES6+)**: Vanilla JavaScript DOM manipulation, event listeners, array handling, and form validation (zero external frameworks or dependencies).
- **Google Fonts**: Cormorant Garamond & Plus Jakarta Sans.

---

## 📂 Project Structure

```text
Peach-and-Co/
├── index.html        # Main HTML structure and semantic markup
├── style.css         # Complete styling, design tokens, and media queries
├── script.js         # Cart logic, FAQ accordion, form validation, and smooth scroll
├── README.md         # Documentation and project overview
└── images/           # Curated boutique lifestyle and product photography
    ├── hero-lifestyle.jpg
    ├── aesthetic-notebook.jpg
    ├── ceramic-coffee-mug.jpg
    ├── everyday-tote-bag.jpg
    └── scented-candle.jpg
```

---

## 🚀 How to Run the Website Locally

You can run this website on any operating system without installing compilers or npm packages:

### Option 1: Direct Browser Launch
1. Double-click `index.html` in your file explorer, or right-click and choose **Open With > Google Chrome / Microsoft Edge / Firefox**.

### Option 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python Built-in Server
If Python is installed on your computer:
```bash
# In the project directory:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📜 License
Created for educational and portfolio demonstration purposes. All rights reserved &copy; 2026 Peach & Co.
