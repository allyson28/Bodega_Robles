// Global state
let currentUser = null
let currentPage = "login"
let cartItems = []
let cartTotal = 0

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Setup login form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Setup payment form
  const paymentForm = document.getElementById("paymentForm")
  if (paymentForm) {
    paymentForm.addEventListener("submit", handlePayment)
  }

  // Setup supply form
  const supplyForm = document.getElementById("supplyForm")
  if (supplyForm) {
    supplyForm.addEventListener("submit", (event) => {
      event.preventDefault()
      alert("Supply form submitted")
    })
  }

  // Setup amount received input for change calculation
  const amountReceived = document.getElementById("amountReceived")
  if (amountReceived) {
    amountReceived.addEventListener("input", calculateChange)
  }
}

// Login functionality
function handleLogin(event) {
  event.preventDefault()

  const userId = document.getElementById("userId").value.trim()
  const password = document.getElementById("password").value.trim()

  // Validation
  if (!userId || !password) {
    alert("Por favor completa todos los campos")
    return
  }

  if (userId.length < 3) {
    alert("El ID de usuario debe tener al menos 3 caracteres")
    return
  }

  if (password.length < 4) {
    alert("La contraseña debe tener al menos 4 caracteres")
    return
  }

  // Simulate login (replace with actual backend call)
  currentUser = {
    id: userId,
    name: userId.charAt(0).toUpperCase() + userId.slice(1),
  }

  // Update UI
  document.getElementById("userName").textContent = currentUser.name

  // Show dashboard
  showPage("dashboard")
  navigateTo("dashboard", null)

  // Reset form
  document.getElementById("loginForm").reset()
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const icon = event.target

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    icon.textContent = "🔓"
  } else {
    passwordInput.type = "password"
    icon.textContent = "🔒"
  }
}

// Handle forgot password
function handleForgotPassword(event) {
  event.preventDefault()
  alert("Por favor contacta al administrador para recuperar tu contraseña")
}

// Page navigation
function showPage(pageName) {
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.remove("active"))

  const page = document.getElementById(pageName + "Page")
  if (page) {
    page.classList.add("active")
  }

  currentPage = pageName
}

// Navigate between sections
function navigateTo(section, event) {
  if (event) {
    event.preventDefault()
  }

  // Update active nav item
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => item.classList.remove("active"))

  if (event && event.target.closest(".nav-item")) {
    event.target.closest(".nav-item").classList.add("active")
  }

  // Hide all content sections
  const contentSections = document.querySelectorAll(".content-section")
  contentSections.forEach((section) => section.classList.remove("active"))

  // Show selected section
  const sectionElement = document.getElementById(section + "Content")
  if (sectionElement) {
    sectionElement.classList.add("active")
  }

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    sales: "Proceso de Venta",
    supply: "Abastecimiento",
    inventory: "Gestión de Inventario",
    products: "Gestión de Productos",
    clients: "Gestión de Clientes",
    suppliers: "Gestión de Proveedores",
  }

  document.getElementById("pageTitle").textContent = titles[section] || "Dashboard"
}

// Logout
function logout() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    currentUser = null
    cartItems = []
    cartTotal = 0
    showPage("login")
    document.getElementById("loginForm").reset()
  }
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
  }
}

// Close modal when clicking outside
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active")
  }
})

// Sales functions
function startNewSale() {
  clearCart()
  alert("Nueva venta iniciada")
}

function addToCart(productElement) {
  const productName = productElement.querySelector("h4").textContent
  const productPrice = Number.parseFloat(productElement.querySelector(".product-price").textContent.replace("$", ""))

  // Check if product already in cart
  const existingItem = cartItems.find((item) => item.name === productName)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({
      name: productName,
      price: productPrice,
      quantity: 1,
    })
  }

  updateCart()
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cartItems")
  cartItemsContainer.innerHTML = ""

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">El carrito está vacío</p>'
    updateCartTotals()
    return
  }

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-qty">${item.quantity}</span>
            <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
        `
    cartItemsContainer.appendChild(cartItem)
  })

  updateCartTotals()
}

function removeFromCart(index) {
  cartItems.splice(index, 1)
  updateCart()
}

function clearCart() {
  cartItems = []
  updateCart()
}

function updateCartTotals() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2)
  document.getElementById("tax").textContent = "$" + tax.toFixed(2)
  document.getElementById("total").textContent = "$" + total.toFixed(2)

  cartTotal = total
}

function proceedToPayment() {
  if (cartItems.length === 0) {
    alert("El carrito está vacío")
    return
  }

  document.getElementById("paymentTotal").textContent = "$" + cartTotal.toFixed(2)
  openModal("paymentModal")
}

function calculateChange() {
  const amountReceived = Number.parseFloat(document.getElementById("amountReceived").value) || 0
  const change = amountReceived - cartTotal

  if (change < 0) {
    document.getElementById("change").value = "Monto insuficiente"
    document.getElementById("change").style.color = "var(--danger)"
  } else {
    document.getElementById("change").value = "$" + change.toFixed(2)
    document.getElementById("change").style.color = "var(--primary-green)"
  }
}

function handlePayment(event) {
  event.preventDefault()

  const paymentMethod = document.getElementById("paymentMethod").value
  const amountReceived = Number.parseFloat(document.getElementById("amountReceived").value)

  if (!paymentMethod) {
    alert("Por favor selecciona un método de pago")
    return
  }

  if (amountReceived < cartTotal) {
    alert("El monto recibido es insuficiente")
    return
  }

  // Simulate payment processing
  alert(`Pago procesado exitosamente\nMétodo: ${paymentMethod}\nTotal: $${cartTotal.toFixed(2)}`)

  // Clear cart and close modal
  clearCart()
  closeModal("paymentModal")
  document.getElementById("paymentForm").reset()
}

function filterProducts(category) {
  const buttons = document.querySelectorAll(".filter-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))

  event.target.classList.add("active")

  // Simulate filtering
  console.log("Filtering products by category:", category)
}

// Inventory functions
function editInventory(id) {
  alert("Editar inventario ID: " + id)
}

function exportInventory() {
  alert("Exportando inventario...")
}

// Product functions
function openProductForm() {
  alert("Abrir formulario de nuevo producto")
}

function editProduct(id) {
  alert("Editar producto ID: " + id)
}

function deleteProduct(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    alert("Producto eliminado")
  }
}

// Client functions
function openClientForm() {
  alert("Abrir formulario de nuevo cliente")
}

function editClient(id) {
  alert("Editar cliente ID: " + id)
}

function deleteClient(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
    alert("Cliente eliminado")
  }
}

// Supplier functions
function openSupplierForm() {
  alert("Abrir formulario de nuevo proveedor")
}

function editSupplier(id) {
  alert("Editar proveedor ID: " + id)
}

function deleteSupplier(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
    alert("Proveedor eliminado")
  }
}
