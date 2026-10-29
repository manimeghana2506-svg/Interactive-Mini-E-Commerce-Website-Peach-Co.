/**
 * Peach & Co. - Mini E-Commerce Website
 * Vanilla JavaScript Functionality
 * 
 * Features included:
 * 1. Shopping Cart Counter & Session Array Tracker
 * 2. Add-to-Cart Confirmation Toast Notification
 * 3. Shopping Cart Drawer View (Session items & total)
 * 4. FAQ Accordion (Expand / Collapse)
 * 5. Contact Form Validation (Name, Email format, Message)
 * 6. Smooth Scrolling for Navigation & Buttons
 * 7. Mobile Navigation Toggle
 */

// Wait for the DOM content to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Shopping Cart System (State & Session Storage)
     ========================================================================== */
  
  // Array to store products added during the current browsing session
  const cartItems = [];

  // DOM Elements for the cart
  const cartCountEl = document.getElementById('cart-count');
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartModalClose = document.getElementById('cart-modal-close');
  const cartModalOverlay = document.getElementById('cart-modal-overlay');
  const cartContinueBtn = document.getElementById('cart-continue-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartTotalPrice = document.getElementById('cart-total-price');
  
  // Toast Notification Elements
  const toastNotification = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  /**
   * Display a temporary confirmation toast message when a product is added
   * @param {string} productName - The name of the item added
   */
  function showToast(productName) {
    if (!toastNotification) return;

    toastTitle.textContent = 'Added to Cart!';
    toastMessage.textContent = `"${productName}" is now in your boutique bag.`;

    // Add visible class
    toastNotification.classList.add('show');

    // Clear any active timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    // Hide after 3.5 seconds
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3500);
  }

  /**
   * Updates the cart badge number and animates it
   */
  function updateCartBadge() {
    if (cartCountEl) {
      cartCountEl.textContent = cartItems.length;
      
      // Trigger a subtle bump animation
      cartCountEl.classList.remove('bump');
      // Void offset to restart animation
      void cartCountEl.offsetWidth;
      cartCountEl.classList.add('bump');
    }
  }

  /**
   * Re-renders the list of items inside the Cart Modal
   */
  function renderCartModal() {
    if (!cartItemsList || !cartEmptyState || !cartTotalPrice) return;

    // Clear existing list items
    cartItemsList.innerHTML = '';

    if (cartItems.length === 0) {
      cartEmptyState.style.display = 'block';
      cartTotalPrice.textContent = '₹0';
      return;
    }

    // Hide empty placeholder
    cartEmptyState.style.display = 'none';

    // Calculate total price
    let total = 0;

    // Render each item in the session array
    cartItems.forEach((item, index) => {
      total += item.price;

      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">₹${item.price}</span>
        </div>
        <span style="font-size: 0.8rem; color: #7B4B35; background: #FFE3D8; padding: 2px 8px; border-radius: 12px;">Item #${index + 1}</span>
      `;
      cartItemsList.appendChild(li);
    });

    cartTotalPrice.textContent = `₹${total}`;
  }

  /**
   * Adds an item to the cart array and refreshes UI
   * @param {string} name - Product Name
   * @param {number} price - Product Price in INR
   */
  function addToCart(name, price) {
    // 1. Add to session array
    cartItems.push({
      name: name,
      price: Number(price),
      timestamp: new Date()
    });

    // 2. Update cart counter in header
    updateCartBadge();

    // 3. Show confirmation feedback
    showToast(name);

    // 4. Update the cart drawer contents
    renderCartModal();
  }

  // Attach click listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.btn-add-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Find the closest product card container
      const productCard = event.currentTarget.closest('.product-card');
      if (productCard) {
        const name = productCard.getAttribute('data-product-name');
        const price = productCard.getAttribute('data-product-price');
        addToCart(name, price);
      }
    });
  });

  // Modal open & close handlers
  function openCartModal() {
    if (cartModal) {
      cartModal.classList.add('open');
      cartModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeCartModal() {
    if (cartModal) {
      cartModal.classList.remove('open');
      cartModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCartModal);
  if (cartModalClose) cartModalClose.addEventListener('click', closeCartModal);
  if (cartModalOverlay) cartModalOverlay.addEventListener('click', closeCartModal);
  if (cartContinueBtn) cartContinueBtn.addEventListener('click', closeCartModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal && cartModal.classList.contains('open')) {
      closeCartModal();
    }
  });


  /* ==========================================================================
     2. FAQ Accordion Functionality
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(questionBtn => {
    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';
      const answerPanel = questionBtn.nextElementSibling;
      const icon = questionBtn.querySelector('.faq-icon');

      // Toggle current question
      if (isExpanded) {
        // Close it
        questionBtn.setAttribute('aria-expanded', 'false');
        if (answerPanel) answerPanel.style.maxHeight = null;
        if (icon) icon.textContent = '+';
      } else {
        // Close any other open accordion items for clean UX
        faqQuestions.forEach(otherBtn => {
          if (otherBtn !== questionBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherBtn.nextElementSibling) {
              otherBtn.nextElementSibling.style.maxHeight = null;
            }
            const otherIcon = otherBtn.querySelector('.faq-icon');
            if (otherIcon) otherIcon.textContent = '+';
          }
        });

        // Open clicked question
        questionBtn.setAttribute('aria-expanded', 'true');
        if (answerPanel) {
          answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
        }
        if (icon) icon.textContent = '−';
      }
    });
  });


  /* ==========================================================================
     3. Contact Form Validation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const formSuccessMsg = document.getElementById('form-success-msg');
  const formErrorSummary = document.getElementById('form-error-summary');

  /**
   * Simple standard regex to validate email format: user@domain.extension
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Helper function to show input error
   */
  function showError(inputEl, errorEl, message) {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    errorEl.textContent = message;
  }

  /**
   * Helper function to mark input as valid
   */
  function clearError(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    errorEl.textContent = '';
  }

  // Real-time input listeners to clear errors as user types
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        clearError(nameInput, nameError);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value.trim())) {
        clearError(emailInput, emailError);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) {
        clearError(messageInput, messageError);
      }
    });
  }

  // Form submit handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Prevent browser from reloading the page
      e.preventDefault();

      let hasErrors = false;

      // 1. Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        showError(nameInput, nameError, 'Please enter your name.');
        hasErrors = true;
      } else if (nameVal.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters long.');
        hasErrors = true;
      } else {
        clearError(nameInput, nameError);
      }

      // 2. Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        showError(emailInput, emailError, 'Please enter your email address.');
        hasErrors = true;
      } else if (!isValidEmail(emailVal)) {
        showError(emailInput, emailError, 'Please enter a valid email address (e.g., name@example.com).');
        hasErrors = true;
      } else {
        clearError(emailInput, emailError);
      }

      // 3. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        showError(messageInput, messageError, 'Please write your message.');
        hasErrors = true;
      } else if (messageVal.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long.');
        hasErrors = true;
      } else {
        clearError(messageInput, messageError);
      }

      // Display feedback depending on validation outcome
      if (hasErrors) {
        if (formErrorSummary) formErrorSummary.style.display = 'flex';
        if (formSuccessMsg) formSuccessMsg.style.display = 'none';
      } else {
        // Validation Passed!
        if (formErrorSummary) formErrorSummary.style.display = 'none';
        if (formSuccessMsg) formSuccessMsg.style.display = 'flex';

        // Reset form inputs
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach(el => {
          if (el) el.classList.remove('is-valid');
        });

        // Hide success message after 6 seconds
        setTimeout(() => {
          if (formSuccessMsg) formSuccessMsg.style.display = 'none';
        }, 6000);
      }
    });
  }


  /* ==========================================================================
     4. Mobile Navigation Menu Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }


  /* ==========================================================================
     5. Smooth Scrolling for Anchor Links
     ========================================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Offset for the sticky header
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
