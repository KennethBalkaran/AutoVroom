document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".pakket-btn");

  // Elementen voor de (rode) winkelwagen – bestaan mogelijk niet allemaal; we checken veilig
  const cartBody = document.getElementById("cart-body");
  const cartTotal = document.getElementById("cart-total");
  const totalPriceEl = document.getElementById("total-price");
  const gekozenInfo = document.getElementById("gekozen-info"); // optioneel (oude tekst-sectie)
  const checkoutBtn = document.getElementById("checkout-btn"); // optioneel (Bestellen-knop)

  const INSCHRIJFKOSTEN = 39.5;
  const KORTING = 50;

  let selected = null;

  // Helpers
  function resetButtons() {
    buttons.forEach((b) => {
      b.disabled = false;
      b.textContent = "Kies dit pakket";
      b.style.background = "#fff"; // rood thema, matcht je CSS
      b.style = "#fd3643"
    });
  }

  function renderNone() {
    if (cartBody) cartBody.innerHTML = "<p>Nog geen pakket gekozen</p>";
    if (cartTotal) cartTotal.style.display = "none";
    if (gekozenInfo) gekozenInfo.textContent = "Nog geen pakket gekozen";
    updateCheckout(false);
  }

  function renderCart(name, price) {
    if (cartBody) {
      cartBody.innerHTML = `
        <div class="cart-item">
          <span>${name}</span>
          <span>€ ${price.toFixed(2)}</span>
        </div>
        <div class="cart-item">
          <span>Inschrijfkosten</span>
          <span>€ ${INSCHRIJFKOSTEN.toFixed(2)}</span>
        </div>
        <div class="cart-item discount">
          <span>Online korting</span>
          <span>- € ${KORTING.toFixed(2)}</span>
        </div>
      `;
    }
    const total = price + INSCHRIJFKOSTEN - KORTING;
    if (totalPriceEl) totalPriceEl.textContent = `€ ${total.toFixed(2)}`;
    if (cartTotal) cartTotal.style.display = "flex";
    if (gekozenInfo) gekozenInfo.textContent = `${name} - €${price.toFixed(2)} is gekozen`;
    updateCheckout(true);
  }

  function updateCheckout(enabled) {
    if (!checkoutBtn) return; // knop nog niet toegevoegd? Geen probleem.
    if (enabled) {
      checkoutBtn.classList.add("active");
      checkoutBtn.classList.remove("disabled");
      checkoutBtn.setAttribute("aria-disabled", "false");
      checkoutBtn.style.pointerEvents = "auto";
    } else {
      checkoutBtn.classList.remove("active");
      checkoutBtn.classList.add("disabled");
      checkoutBtn.setAttribute("aria-disabled", "true");
      checkoutBtn.style.pointerEvents = "none";
    }
  }

  // Init
  resetButtons();
  renderNone();

  // Interactie
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-pakket");
      const price = parseFloat(btn.getAttribute("data-prijs"));

      // Deselecteren
      if (selected === name) {
        selected = null;
        resetButtons();
        renderNone();
        return;
      }

      // Nieuw selecteren
      selected = name;

      // Disable overige knoppen, markeer gekozen knop
      buttons.forEach((b) => {
        if (b !== btn) {
          b.disabled = true;
        } else {
          b.textContent = "Gekozen";
          b.style.background = "#28a745"; // groen voor gekozen
        }
      });

      renderCart(name, price);
    });
  });
});

