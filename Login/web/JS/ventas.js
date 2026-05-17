// Sales module specific functions

function startNewSale() {
  clearCart()
  document.getElementById("productSearch").value = ""
  console.log("Nueva venta iniciada")
}

function searchProducts(query) {
  const productsGrid = document.getElementById("productsGrid")
  const productCards = productsGrid.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    const productName = card.querySelector("h4").textContent.toLowerCase()
    if (productName.includes(query.toLowerCase())) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Setup product search
document.addEventListener("DOMContentLoaded", () => {
  const productSearch = document.getElementById("productSearch")
  if (productSearch) {
    productSearch.addEventListener("input", (e) => {
      searchProducts(e.target.value)
    })
  }
})

// Declare clearCart function
function clearCart() {
  // Implementation of clearCart function goes here
  console.log("Carrito vaciado")
}
