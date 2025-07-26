// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  if (!loadingScreen) return // Exit if loading screen doesn't exist
  
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
})

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none"
    menuBtn.classList.remove("active")
  } else {
    mobileMenu.style.display = "block"
    menuBtn.classList.add("active")
  }
}

// Hero Slider
let slideIndex = 1
const slides = [
  {
    image:
      "https://sjc.microlink.io/bWjGT3L3bn2dtqzQrcZ1VGRCnA0T5IaRX4QAQe4yOBSfZAMeORB6LSiLe6YExUw5r7nQm9peCfSCl6xgpklZKA.jpeg",
    title: "Discover the Difference",
    subtitle1: "EVER-EVOLVING OUR LUXURY SEASONAL",
    subtitle2: "COLLECTIONS ARE FULLY CUSTOMIZABLE",
  },
  {
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&h=800&fit=crop",
    title: "Premium Collections",
    subtitle1: "HANDCRAFTED WITH THE FINEST",
    subtitle2: "INGREDIENTS FROM AROUND THE WORLD",
  },
  {
    image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=1400&h=800&fit=crop",
    title: "Artisan Craftsmanship",
    subtitle1: "TRADITIONAL METHODS MEET",
    subtitle2: "CONTEMPORARY LUXURY DESIGN",
  },
]

function showSlide(n) {
  const slideElements = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const heroTitle = document.querySelector(".hero-title")
  const heroSubtitles = document.querySelectorAll(".hero-subtitle")

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  // Hide all slides
  slideElements.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  // Show current slide
  if (slideElements[slideIndex - 1]) {
    slideElements[slideIndex - 1].classList.add("active")
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active")
  }

  // Update content with smooth transition
  const currentSlide = slides[slideIndex - 1]
  if (currentSlide && heroTitle) {
    heroTitle.style.opacity = "0"
    heroSubtitles.forEach((subtitle) => (subtitle.style.opacity = "0"))

    setTimeout(() => {
      heroTitle.textContent = currentSlide.title
      if (heroSubtitles[0]) heroSubtitles[0].textContent = currentSlide.subtitle1
      if (heroSubtitles[1]) heroSubtitles[1].textContent = currentSlide.subtitle2

      heroTitle.style.opacity = "1"
      heroSubtitles.forEach((subtitle) => (subtitle.style.opacity = "1"))
    }, 300)
  }
}

function changeSlide(n) {
  showSlide((slideIndex += n))
}

function currentSlide(n) {
  showSlide((slideIndex = n))
}

// Auto slide
function autoSlide() {
  slideIndex++
  showSlide(slideIndex)
}

// Location Modal Functions
function openLocationModal() {
  document.getElementById("locationModal").style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeLocationModal() {
  document.getElementById("locationModal").style.display = "none"
  document.body.style.overflow = "auto"
}

function applyLocation() {
  const countrySelect = document.getElementById("countrySelect")
  const languageSelect = document.getElementById("languageSelect")

  if (countrySelect.value && languageSelect.value) {
    // Update the location button text
    const locationBtn = document.querySelector(".location-btn")
    const selectedCountry = countrySelect.options[countrySelect.selectedIndex]
    const flagEmoji = selectedCountry.text.split(" ")[0]
    const countryCode = selectedCountry.text.split(" ")[1]

    locationBtn.innerHTML = `
            Ship To: 
            <span class="flag">${flagEmoji}</span>
            ${countryCode}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
            </svg>
        `

    closeLocationModal()

    // Show success message
    showNotification("Location updated successfully!")
  } else {
    showErrorMessage("Please select both country and language")
  }
}

// Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div')
  notification.className = `notification ${type}`
  notification.textContent = message
  
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification')
  existingNotifications.forEach(n => n.remove())
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.add('show')
  }, 100)
  
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 4000)
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
        color: #ff4444;
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
        padding: 10px;
        background: rgba(255, 68, 68, 0.1);
        border-radius: 6px;
    `

  // Remove existing error message
  const existingError = document.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }

  const modalButtons = document.querySelector(".modal-buttons")
  modalButtons.parentNode.insertBefore(errorDiv, modalButtons)

  // Remove error message after 3 seconds
  setTimeout(() => {
    errorDiv.remove()
  }, 3000)
}

// Close modal when clicking outside
window.onclick = (event) => {
  const modal = document.getElementById("locationModal")
  if (event.target === modal) {
    closeLocationModal()
  }
}

// Scroll Animations
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function handleScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element, index) => {
    if (isElementInViewport(element)) {
      setTimeout(() => {
        element.classList.add("animate")
      }, index * 100)
    }
  })
}

// Back to Top Button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function handleBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")
  if (!backToTopBtn) return // Exit if button doesn't exist
  
  if (window.pageYOffset > 400) {
    backToTopBtn.classList.add("show")
  } else {
    backToTopBtn.classList.remove("show")
  }
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || []

function addToCart(productId, quantity = 1) {
  // Product data (in a real app, this would come from a database)
  const products = {
    1: { id: 1, name: "Premium Dates Collection", price: 89, image: "boite 1.jpg" },
    2: { id: 2, name: "Luxury Gift Box", price: 129, image: "boite 2.jpg" },
    3: { id: 3, name: "Artisan Chocolates", price: 75, image: "boite 3.jpg" },
    4: { id: 4, name: "Elegant Gift Set", price: 95, image: "boite 4.jpg" },
    5: { id: 5, name: "Classic Dates Box", price: 65, image: "boite 5.jpg" },
    6: { id: 6, name: "Seasonal Collection", price: 145, image: "boite 6.jpg" },
    7: { id: 7, name: "Dark Chocolate Assortment", price: 85, image: "boite 7.jpg" },
    8: { id: 8, name: "Premium Gift Collection", price: 110, image: "boite 8.jpg" }
  }
  
  const product = products[productId]
  if (!product) return
  
  const existingItem = cart.find(item => item.id === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    })
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart))
  
  // Update cart count
  updateCartCount()
  
  // Show success message
  showNotification('Product added to cart!')
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count')
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

function goToCheckout() {
  if (cart.length > 0) {
    window.location.href = 'checkout.html'
  } else {
    showNotification('Your cart is empty!', 'error')
  }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount()
  
  // Add click handlers for cart button
  const cartBtn = document.querySelector('.cart-btn')
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      if (cart.length > 0) {
        window.location.href = 'checkout.html'
      } else {
        showNotification('Your cart is empty!', 'error')
      }
    })
  }
  
  // Update navigation links
  updateNavigationLinks()
})

function updateNavigationLinks() {
  // Update "Shop Collection" button to go to collection page
  const shopButtons = document.querySelectorAll('.hero-btn, .product-btn')
  shopButtons.forEach(button => {
    if (button.textContent.includes('SHOP') || button.textContent.includes('Shop')) {
      button.addEventListener('click', function(e) {
        e.preventDefault()
        window.location.href = 'collection.html'
      })
    }
  })
  
  // Update category links
  const categoryLinks = document.querySelectorAll('.category-link')
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault()
      window.location.href = 'collection.html'
    })
  })
}

// Newsletter Subscription
function handleNewsletterSubmit(event) {
  event.preventDefault()
  const email = event.target.querySelector('input[type="email"]').value

  if (email) {
    // Simulate API call
    const submitBtn = event.target.querySelector("button")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Subscribing..."
    submitBtn.disabled = true

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
      event.target.reset()
      showNotification("Successfully subscribed to RANEEM newsletter!")
    }, 1500)
  }
}

// Product Interactions
function initProductCards() {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    const quickViewBtn = card.querySelector(".quick-view-btn")
    const productBtn = card.querySelector(".product-btn")

    if (quickViewBtn) {
      quickViewBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const productName = card.querySelector("h3").textContent
        showNotification(`Quick view for item - Feature coming soon!`)
      })
    }

    if (productBtn) {
      productBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const productName = card.querySelector("h3").textContent
        const price = card.querySelector(".product-price").textContent
        addToCart(productName, price)
      })
    }
  })
}

// Search Functionality
function initSearch() {
  const searchBtn = document.querySelector(".search-btn")

  searchBtn.addEventListener("click", () => {
    // Create search overlay
    const searchOverlay = document.createElement("div")
    searchOverlay.className = "search-overlay"
    searchOverlay.innerHTML = `
            <div class="search-container">
                <input type="text" placeholder="Search products..." class="search-input" autofocus>
                <button class="search-close">&times;</button>
            </div>
        `

    searchOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `

    document.body.appendChild(searchOverlay)

    // Close search overlay
    const closeBtn = searchOverlay.querySelector(".search-close")
    closeBtn.addEventListener("click", () => {
      searchOverlay.remove()
    })

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchOverlay.remove()
      }
    })
  })
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key closes modal
  if (e.key === "Escape") {
    closeLocationModal()
  }

  // Arrow keys for slider navigation
  if (e.key === "ArrowLeft") {
    changeSlide(-1)
  } else if (e.key === "ArrowRight") {
    changeSlide(1)
  }
})

// Touch/Swipe Support for Mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      changeSlide(1)
    } else {
      // Swipe right - previous slide
      changeSlide(-1)
    }
  }
}

// Performance Optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
  handleScrollAnimations()
  handleBackToTop()
}, 10)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize slider
  showSlide(slideIndex)

  // Auto slide every 6 seconds
  setInterval(autoSlide, 6000)

  // Initialize scroll animations
  handleScrollAnimations()

  // Initialize product cards
  initProductCards()

  // Initialize search
  initSearch()

  // Add newsletter form handler
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit)
  }

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const footerCopyright = document.querySelector(".footer-bottom-left p")
  if (footerCopyright) {
    footerCopyright.textContent = "© 2024 RANEEM International. All rights reserved."
  }
})

// Event Listeners
window.addEventListener("scroll", debouncedScrollHandler)

window.addEventListener("resize", () => {
  // Handle responsive adjustments
  const mobileMenu = document.getElementById("mobileMenu")
  if (window.innerWidth > 768) {
    mobileMenu.style.display = "none"
    document.querySelector(".mobile-menu-btn").classList.remove("active")
  }
})

// Add CSS animations dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .search-container {
        position: relative;
        max-width: 600px;
        width: 90%;
    }
    
    .search-input {
        width: 100%;
        padding: 20px 60px 20px 20px;
        font-size: 18px;
        border: none;
        border-radius: 8px;
        outline: none;
    }
    
    .search-close {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
`
document.head.appendChild(style)
