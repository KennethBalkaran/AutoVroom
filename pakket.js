document.addEventListener("DOMContentLoaded", () => {
  // Pakket knoppen (staan elders op de pagina)
  const pakketKnoppen = document.querySelectorAll(".pakket-btn");

  // Winkelmandje elementen
  const cartBody     = document.getElementById("cart-body");
  const cartTotal    = document.getElementById("cart-total");
  const totalPriceEl = document.getElementById("total-price");

  // Form & knop
  const form         = document.getElementById("bestel-form");
  const inputs       = form ? form.querySelectorAll("input") : [];
  const checkoutBtn  = document.getElementById("checkout-btn");

  // Prijsregels
  const INSCHRIJFKOSTEN = 39.5;
  const KORTING         = 50;

  // Huidige keuze
  let selectedName  = null;
  let selectedPrice = 0;

  // ---------- Helpers ----------
  function enableForm(enable) {
    inputs.forEach(i => i.disabled = !enable);
  }

  function validateFormFields() {
    if (!form) return false;
    let ok = true;
    inputs.forEach(i => {
      const v = i.value.trim();
      if (!v) ok = false;
      if (i.type === "email" && v && !/\S+@\S+\.\S+/.test(v)) ok = false;
    });
    return ok;
  }

  function updateCheckoutButton() {
    const canSubmit = !!selectedName && validateFormFields();
    checkoutBtn.disabled = !canSubmit;   // echte disable
  }

  function renderEmptyCart() {
    cartBody.innerHTML = "<p>Nog geen pakket gekozen</p>";
    cartTotal.style.display = "none";
    enableForm(false);
    updateCheckoutButton();
  }

  function renderCart(name, price) {
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
    const totaal = price + INSCHRIJFKOSTEN - KORTING;
    totalPriceEl.textContent = `€ ${totaal.toFixed(2)}`;
    cartTotal.style.display = "flex";
    enableForm(true);
    updateCheckoutButton();
  }

  function resetPakketKnoppen() {
    pakketKnoppen.forEach(b => {
      b.disabled = false;
      b.textContent = "Kies dit pakket";
      b.style.background = "#e63946";
    });
  }

  // ---------- Init ----------
  resetPakketKnoppen();
  renderEmptyCart();

  // ---------- Pakket selecteren / deselecteren ----------
  pakketKnoppen.forEach((btn) => {
    btn.addEventListener("click", () => {
      const naam  = btn.getAttribute("data-pakket");
      const prijs = parseFloat(btn.getAttribute("data-prijs"));

      // Deselecteren
      if (selectedName === naam) {
        selectedName = null;
        selectedPrice = 0;
        resetPakketKnoppen();
        renderEmptyCart();
        return;
      }

      // Nieuw selecteren
      selectedName = naam;
      selectedPrice = prijs;

      pakketKnoppen.forEach((b) => {
        if (b !== btn) {
          b.disabled = true;
        } else {
          b.textContent = "Gekozen";
          b.style.background = "#28a745"; // groen voor gekozen
        }
      });

      renderCart(selectedName, selectedPrice);
    });
  });

  // ---------- Live validatie van form ----------
  inputs.forEach(i => i.addEventListener("input", updateCheckoutButton));

  // ---------- Submit -> ga naar checkout.html ----------
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // dubbelcheck
      if (!selectedName || !validateFormFields()) return;
      window.location.href = "checkout.html";
    });
  }
});
