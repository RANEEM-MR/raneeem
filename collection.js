// Collection Page JavaScript

// Product data
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
    },
    
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format price with proper currency formatting (Euro)
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

// Filter and sort products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredProducts = products.filter(product => {
        let categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
        let priceMatch = true;
        
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(Number);
            if (max) {
                priceMatch = product.price >= min && product.price <= max;
            } else {
                priceMatch = product.price >= min;
            }
        }
        
        return categoryMatch && priceMatch;
    });
    
    // Sort products
    switch(sortFilter) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    displayProducts(filteredProducts);
}

// Display products in grid
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-price', product.price);
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    const badge = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onclick="viewProductDetails(${product.id})" style="cursor: pointer;">
            <div class="product-overlay">
                <button class="quick-view-btn" onclick="quickView(${product.id})">Quick View</button>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
            ${badge}
        </div>
        <div class="product-info">
            <h3 onclick="viewProductDetails(${product.id})" style="cursor: pointer;">${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="review-count">(${product.reviews} reviews)</span>
            </div>
            <div class="product-buttons">
                <button class="product-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="view-details-btn" onclick="viewProductDetails(${product.id})">View Details</button>
            </div>
        </div>
    `;
    
    return card;
}

// Quick view functionality
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const image = document.getElementById('quickViewImage');
    const title = document.getElementById('quickViewTitle');
    const price = document.getElementById('quickViewPrice');
    const rating = document.getElementById('quickViewRating');
    const description = document.getElementById('quickViewDescription');
    
    image.src = product.image;
    image.alt = product.name;
    title.textContent = product.name;
    price.textContent = formatPrice(product.price);
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    rating.innerHTML = `<span class="stars">${stars}</span> <span class="review-count">(${product.reviews} reviews)</span>`;
    description.textContent = product.description;
    
    // Store current product ID for quantity controls
    modal.setAttribute('data-product-id', productId);
    
    modal.style.display = 'block';
}

// Close quick view modal
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart from quick view
function addToCartFromQuickView() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const productId = getCurrentQuickViewProductId();
    addToCart(productId, quantity);
    closeQuickView();
}

// Get current quick view product ID (you'll need to store this when opening quick view)
let currentQuickViewProductId = null;

function quickView(productId) {
    currentQuickViewProductId = productId;
    // ... rest of quick view code
}

function getCurrentQuickViewProductId() {
    return currentQuickViewProductId;
}

// Add to cart functionality
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Synchronize cart data
    syncCartData();
    
    // Update cart count and total
    updateCartCount();
    updateCartTotal();
    
    // Show success message
    showNotification('Product added to cart!');
}

// Update cart count
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Change view (grid/list)
function changeView(viewType) {
    const grid = document.getElementById('productsGrid');
    const buttons = document.querySelectorAll('.view-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (viewType === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}

// Load more products
function loadMoreProducts() {
    // This would typically load more products from an API
    // For now, we'll just show a message
    showNotification('Loading more products...');
}

// View product details (redirect to product page)
function viewProductDetails(productId) {
    if (productId) {
        window.location.href = `about.html?id=${productId}`;
    } else {
        const productId = getCurrentQuickViewProductId();
        if (productId) {
            window.location.href = `about.html?id=${productId}`;
            closeQuickView();
        } else {
            showNotification('Product detail page coming soon!');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display all products initially
    displayProducts(products);
    
    // Update cart count and total
    updateCartCount();
    updateCartTotal();
    
    // Add cart total display
    createCartTotalDisplay();
    
    // Listen for storage changes (cart updates from other pages)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            cart = JSON.parse(e.newValue) || [];
            updateCartCount();
            updateCartTotal();
        }
    });
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('quickViewModal');
        if (event.target === modal) {
            closeQuickView();
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeQuickView();
        }
    });
});

// Synchronize cart data across pages
function syncCartData() {
    // Save current cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event for other pages
    window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { cart: cart }
    }));
}

// Mobile menu functionality (reuse from main script)
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Location modal functionality (reuse from main script)
function openLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.style.display = 'block';
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.style.display = 'none';
}

function applyLocation() {
    const country = document.getElementById('countrySelect').value;
    const language = document.getElementById('languageSelect').value;
    
    // Update the location button text
    const locationBtn = document.querySelector('.location-btn');
    const flagSpan = locationBtn.querySelector('.flag');
    
    const flags = {
        'us': '🇺🇸',
        'uk': '🇬🇧',
        'ca': '🇨🇦',
        'au': '🇦🇺',
        'de': '🇩🇪',
        'fr': '🇫🇷',
        'ae': '🇦🇪',
        'sa': '🇸🇦'
    };
    
    flagSpan.textContent = flags[country] || '🇺🇸';
    
    closeLocationModal();
    showNotification('Location updated successfully!');
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Create cart total display
function createCartTotalDisplay() {
    // Check if cart total display already exists
    if (document.getElementById('cartTotalDisplay')) {
        return;
    }
    
    const cartTotalDisplay = document.createElement('div');
    cartTotalDisplay.id = 'cartTotalDisplay';
    cartTotalDisplay.className = 'cart-total-display';
    cartTotalDisplay.innerHTML = `
        <div class="cart-total-content">
            <div class="cart-total-info">
                <span class="cart-items-count">${getTotalItems()} items</span>
                <span class="cart-total-price">${formatPrice(calculateCartTotal())}</span>
            </div>
            <button class="view-cart-btn" onclick="goToCheckout()">View Cart</button>
        </div>
    `;
    
    // Insert after the collection header
    const collectionHeader = document.querySelector('.collection-header');
    if (collectionHeader) {
        collectionHeader.parentNode.insertBefore(cartTotalDisplay, collectionHeader.nextSibling);
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Get total number of items (sum of quantities)
function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Update cart total display
function updateCartTotal() {
    const cartTotalDisplay = document.getElementById('cartTotalDisplay');
    if (cartTotalDisplay) {
        const itemsCount = cartTotalDisplay.querySelector('.cart-items-count');
        const totalPrice = cartTotalDisplay.querySelector('.cart-total-price');
        
        if (itemsCount) {
            itemsCount.textContent = `${getTotalItems()} items`;
        }
        if (totalPrice) {
            totalPrice.textContent = formatPrice(calculateCartTotal());
        }
    }
}

// Go to checkout
function goToCheckout() {
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        showNotification('Your cart is empty!', 'error');
    }
} 