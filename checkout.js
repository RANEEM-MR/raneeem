// Checkout Page JavaScript

// Cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product data (same as other pages)
const products = [
    {
        id: 1,
        name: "Premium Dates Collection",
        price: 89,
        category: "dates",
        image: "boite 1.jpg",
        description: "Exquisite dates from the finest groves, presented in our signature decorative box",
        rating: 5,
        reviews: 24,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Luxury Gift Box",
        price: 129,
        category: "gift-sets",
        image: "boite 2.jpg",
        description: "Premium gift set perfect for special occasions with dates and chocolates",
        rating: 5,
        reviews: 18,
        badge: "New"
    },
    {
        id: 3,
        name: "Artisan Chocolates",
        price: 75,
        category: "chocolates",
        image: "boite 3.jpg",
        description: "Handcrafted chocolates made with the finest cocoa and premium ingredients",
        rating: 4,
        reviews: 31
    },
    {
        id: 4,
        name: "Elegant Gift Set",
        price: 95,
        category: "gift-sets",
        image: "boite 4.jpg",
        description: "Sophisticated gift collection featuring dates and premium chocolates",
        rating: 5,
        reviews: 15
    },
    {
        id: 5,
        name: "Classic Dates Box",
        price: 65,
        category: "dates",
        image: "boite 5.jpg",
        description: "Traditional dates selection in an elegant presentation box",
        rating: 4,
        reviews: 22
    },
    {
        id: 6,
        name: "Seasonal Collection",
        price: 145,
        category: "seasonal",
        image: "boite 6.jpg",
        description: "Limited edition seasonal gift box with exclusive flavors",
        rating: 5,
        reviews: 8,
        badge: "Limited"
    },
    {
        id: 7,
        name: "Dark Chocolate Assortment",
        price: 85,
        category: "chocolates",
        image: "boite 7.jpg",
        description: "Rich dark chocolate selection with various fillings and flavors",
        rating: 4,
        reviews: 27
    }
];

// Format price with proper currency formatting (Euro)
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
    
    // Listen for storage changes (cart updates from other pages)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            cart = JSON.parse(e.newValue) || [];
            loadCartItems();
            updateCartCount();
        }
    });
});

// Load and display cart items
function loadCartItems() {
    const cartItemsDetailed = document.getElementById('cartItemsDetailed');
    const emptyCartSummary = document.getElementById('emptyCartSummary');
    
    if (cart.length === 0) {
        cartItemsDetailed.style.display = 'none';
        emptyCartSummary.style.display = 'block';
        return;
    }
    
    cartItemsDetailed.style.display = 'block';
    emptyCartSummary.style.display = 'none';
    
    // Clear container
    cartItemsDetailed.innerHTML = '';
    
    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        
        // Create detailed cart item for order summary sidebar
        const cartItemDetailed = document.createElement('div');
        cartItemDetailed.className = 'cart-item-detailed';
        cartItemDetailed.innerHTML = `
            <div class="cart-item-image-detailed">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="cart-item-content-detailed">
                <div class="cart-item-name-detailed">${product.name}</div>
                <div class="cart-item-variant-detailed">${product.category}</div>
                <div class="cart-item-price-detailed">${formatPrice(product.price)} each</div>
                <div class="cart-item-quantity-detailed">
                    <span class="quantity-display-detailed">Qty: ${item.quantity}</span>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="cart-item-total-detailed">
                ${formatPrice(product.price * item.quantity)}
            </div>
        `;
        
        cartItemsDetailed.appendChild(cartItemDetailed);
    });
    
    updateSummary();
}

// Update item quantity
function updateQuantity(index, change) {
    if (index < 0 || index >= cart.length) return;
    
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity <= 0) {
        removeItem(index);
    } else {
        cart[index].quantity = newQuantity;
        saveCart();
        loadCartItems();
    }
}

// Remove item from cart
function removeItem(index) {
    if (index < 0 || index >= cart.length) return;
    
    cart.splice(index, 1);
    saveCart();
    loadCartItems();
    updateCartCount();
    
    showNotification('Item removed from cart');
}

// Update cart summary
function updateSummary() {
    const summaryItemsCount = document.getElementById('summaryItemsCount');
    const summaryTotal = document.getElementById('summaryTotal');
    const subtotalAmount = document.getElementById('subtotalAmount');
    const shippingAmount = document.getElementById('shippingAmount');
    const discountAmount = document.getElementById('discountAmount');
    const discountRow = document.getElementById('discountRow');
    const totalAmount = document.getElementById('totalAmount');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    // Calculate shipping (free for orders over €100, otherwise €10)
    const shipping = subtotal >= 100 ? 0 : 0;
    
    // Calculate discount (example: 10% off for orders over €150)
    const discount = subtotal >= 150 ? subtotal * 0.1 : 0;
    
    const total = subtotal + shipping - discount;
    
    // Update summary info
    summaryItemsCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    summaryTotal.textContent = formatPrice(total);
    
    // Update detailed breakdown
    subtotalAmount.textContent = formatPrice(subtotal);
    shippingAmount.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
    
    if (discount > 0) {
        discountAmount.textContent = `-${formatPrice(discount)}`;
        discountRow.style.display = 'flex';
    } else {
        discountRow.style.display = 'none';
    }
    
    totalAmount.textContent = formatPrice(total);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Location modal functionality
function openLocationModal() {
    document.getElementById('locationModal').style.display = 'block';
}

function closeLocationModal() {
    document.getElementById('locationModal').style.display = 'none';
}

function applyLocation() {
    const country = document.getElementById('countrySelect').value;
    const language = document.getElementById('languageSelect').value;
    
    // Update flag and location text
    const flagElement = document.querySelector('.flag');
    const locationText = document.querySelector('.location-btn');
    
    const countryFlags = {
        'us': '🇺🇸',
        'uk': '🇬🇧',
        'ca': '🇨🇦',
        'au': '🇦🇺',
        'de': '🇩🇪',
        'fr': '🇫🇷',
        'ae': '🇦🇪',
        'sa': '🇸🇦'
    };
    
    const countryNames = {
        'us': 'US',
        'uk': 'UK',
        'ca': 'CA',
        'au': 'AU',
        'de': 'DE',
        'fr': 'FR',
        'ae': 'AE',
        'sa': 'SA'
    };
    
    flagElement.textContent = countryFlags[country] || '🇺🇸';
    locationText.innerHTML = `Ship To: <span class="flag">${flagElement.textContent}</span> ${countryNames[country] || 'US'} <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>`;
    
    closeLocationModal();
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('locationModal');
    if (event.target === modal) {
        closeLocationModal();
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation
function validateForm() {
    const requiredFields = [
        'firstName', 'lastName', 'email', 'phone', 'address', 
        'city', 'state', 'zipCode', 'country',
        'cardNumber', 'expiryDate', 'cvv', 'cardholderName'
    ];
    
    let isValid = true;
    const errors = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            errors.push(`${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
            if (field) {
                field.classList.add('error');
            }
        } else {
            if (field) {
                field.classList.remove('error');
            }
        }
    });
    
    // Email validation
    const email = document.getElementById('email');
    if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
            errors.push('Please enter a valid email address');
            email.classList.add('error');
        }
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    if (phone && phone.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
            isValid = false;
            errors.push('Please enter a valid phone number');
            phone.classList.add('error');
        }
    }
    
    // Card number validation (basic)
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber && cardNumber.value) {
        const cardRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        if (!cardRegex.test(cardNumber.value)) {
            isValid = false;
            errors.push('Please enter a valid card number (format: 1234 5678 9012 3456)');
            cardNumber.classList.add('error');
        }
    }
    
    // Expiry date validation
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate && expiryDate.value) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryRegex.test(expiryDate.value)) {
            isValid = false;
            errors.push('Please enter a valid expiry date (format: MM/YY)');
            expiryDate.classList.add('error');
        }
    }
    
    // CVV validation
    const cvv = document.getElementById('cvv');
    if (cvv && cvv.value) {
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(cvv.value)) {
            isValid = false;
            errors.push('Please enter a valid CVV (3-4 digits)');
            cvv.classList.add('error');
        }
    }
    
    return { isValid, errors };
}

// Confirm order function
function confirmOrder() {
    // Check if cart is empty
    if (cart.length === 0) {
        showNotification('Your cart is empty. Please add items before proceeding.', 'error');
        return;
    }
    
    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
        showNotification(`Please fix the following errors:\n${validation.errors.join('\n')}`, 'error');
        return;
    }
    
    // Get form data
    const formData = {
        client: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
            country: document.getElementById('country').value
        },
        payment: {
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value,
            cardholderName: document.getElementById('cardholderName').value,
            billingAddress: document.getElementById('billingAddress').value
        },
        order: {
            items: cart,
            total: calculateTotal(),
            orderNumber: generateOrderNumber(),
            date: new Date().toISOString()
        }
    };
    
    // Show loading state
    const confirmBtn = document.getElementById('confirmOrderBtn');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = `
        <span class="btn-text">Processing...</span>
        <span class="btn-total">${document.getElementById('orderTotal').textContent}</span>
    `;
    confirmBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Process the order (in a real application, this would be an API call)
        processOrder(formData);
        
        // Reset button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }, 2000);
}

// Calculate total
function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    const shipping = subtotal >= 100 ? 0 : 10;
    const discount = subtotal >= 150 ? subtotal * 0.1 : 0;
    
    return subtotal + shipping - discount;
}

// Generate order number
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `RANEEM-${timestamp}-${random}`;
}

// Process order
function processOrder(orderData) {
    // In a real application, this would send the data to your backend
    console.log('Order processed:', orderData);
    
    // Show success message
    showOrderConfirmation(orderData);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Update display
    loadCartItems();
}

// Show order confirmation
function showOrderConfirmation(orderData) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    const total = calculateTotal();
    
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-icon">✓</div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order. Your order number is: <strong>${orderData.order.orderNumber}</strong></p>
            
            <div class="order-details">
                <h3>Order Summary</h3>
                <div class="order-info">
                    <div class="order-item">
                        <span>Order Number:</span>
                        <span>${orderData.order.orderNumber}</span>
                    </div>
                    <div class="order-item">
                        <span>Date:</span>
                        <span>${new Date(orderData.order.date).toLocaleDateString()}</span>
                    </div>
                    <div class="order-item">
                        <span>Total:</span>
                        <span>${formatPrice(total)}</span>
                    </div>
                    <div class="order-item">
                        <span>Shipping Address:</span>
                        <span>${orderData.client.address}, ${orderData.client.city}, ${orderData.client.state} ${orderData.client.zipCode}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeOrderConfirmation()">Continue Shopping</button>
                <button class="btn-primary" onclick="viewOrderDetails()">View Order Details</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeOrderConfirmation();
        }
    }, 10000);
}

// Close order confirmation
function closeOrderConfirmation() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
    // Redirect to home page
    window.location.href = 'index.html';
}

// View order details (placeholder)
function viewOrderDetails() {
    alert('Order details page would be implemented here.');
}

// Format card number input
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

// Format expiry date input
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Add input formatting event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    loadCartItems();
    updateCartCount();
    
    // Add input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
    
    // Listen for storage changes (cart updates from other pages)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            cart = JSON.parse(e.newValue) || [];
            loadCartItems();
            updateCartCount();
        }
    });
}); 