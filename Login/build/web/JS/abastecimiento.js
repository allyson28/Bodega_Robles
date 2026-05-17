// Supply module specific functions

function startNewSupply() {
  document.getElementById("supplyForm").reset()
  document.getElementById("supplyItems").innerHTML = `
        <div class="supply-item">
            <select>
                <option>Seleccionar producto...</option>
                <option>Leche Integral</option>
                <option>Pan Integral</option>
                <option>Queso Fresco</option>
            </select>
            <input type="number" placeholder="Cantidad" min="1">
            <button type="button" class="btn-remove" onclick="removeSupplyItem(this)">✕</button>
        </div>
    `
  console.log("Nueva orden de abastecimiento iniciada")
}

function addSupplyItem() {
  const supplyItems = document.getElementById("supplyItems")
  const newItem = document.createElement("div")
  newItem.className = "supply-item"
  newItem.innerHTML = `
        <select>
            <option>Seleccionar producto...</option>
            <option>Leche Integral</option>
            <option>Pan Integral</option>
            <option>Queso Fresco</option>
        </select>
        <input type="number" placeholder="Cantidad" min="1">
        <button type="button" class="btn-remove" onclick="removeSupplyItem(this)">✕</button>
    `
  supplyItems.appendChild(newItem)
}

function removeSupplyItem(button) {
  button.closest(".supply-item").remove()
}

function handleSupplySubmit(event) {
  event.preventDefault()

  const supplyItems = document.querySelectorAll(".supply-item")
  let hasItems = false

  supplyItems.forEach((item) => {
    const select = item.querySelector("select")
    const input = item.querySelector("input")

    if (select.value !== "Seleccionar producto..." && input.value) {
      hasItems = true
    }
  })

  if (!hasItems) {
    alert("Por favor agrega al menos un producto a la orden")
    return
  }

  alert("Orden de abastecimiento enviada exitosamente")
  document.getElementById("supplyForm").reset()
}

function viewOrder(id) {
  alert("Ver detalles de la orden: " + id)
}
