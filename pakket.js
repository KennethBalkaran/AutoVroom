document.addEventListener("DOMContentLoaded", () => {
  // Pakket knoppen
  const pakketKnoppen = document.querySelectorAll(".pakket-btn");

  // Winkelmandje elementen
  const cartBody     = document.getElementById("cart-body");
  const cartTotal    = document.getElementById("cart-total");
  const totalPriceEl = document.getElementById("total-price");

  // Form & knop
  const form         = document.getElementById("bestel-form");
  const inputs       = form ? form.querySelectorAll("input") : [];
  const checkoutBtn  = document.getElementById("checkout-btn");

  // Modal elementen
  const modal = document.getElementById("checkoutModal");
  const closeModalBtn = document.getElementById("closeModal");
  const confirmBtn = document.getElementById("confirm-btn");
  const modalPakketNaam = document.getElementById("modal-pakket-naam");
  const modalPakketPrijs = document.getElementById("modal-pakket-prijs");
  const modalTotaalPrijs = document.getElementById("modal-totaal-prijs");

  // Extra kosten/korting
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
    checkoutBtn.disabled = !canSubmit;
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
      b.style.background = "#fd3643";
      b.style = "#fff";
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
          b.style.background = "#28a745"; // groen
        }
      });

      renderCart(selectedName, selectedPrice);
    });
  });

  // ---------- Live validatie ----------
  inputs.forEach(i => i.addEventListener("input", updateCheckoutButton));

  // ---------- Checkout knop -> open modal ----------
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      // Vul de modal met gegevens
      if (selectedName && selectedPrice) {
        const totaal = selectedPrice + INSCHRIJFKOSTEN - KORTING;
        modalPakketNaam.textContent = selectedName;
        modalPakketPrijs.textContent = `€${selectedPrice.toFixed(2)}`;
        modalTotaalPrijs.textContent = `€${totaal.toFixed(2)}`;

        // Open modal
        modal.style.display = "flex";
      }
    });
  }

  // ---------- Sluit modal ----------
  closeModalBtn.onclick = () => {
    modal.style.display = "none";
  };
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // ---------- Bevestigen in modal ----------
  confirmBtn.onclick = () => {
    // Hier kun je verdere verwerking doen (bv. betalen, bevestigen, etc.)
    alert("Bedankt voor je bestelling!");
    modal.style.display = "none";

    // Optioneel: reset alles na bevestiging
    selectedName = null;
    selectedPrice = 0;
    renderEmptyCart();
    inputs.forEach(i => i.value = "");
    updateCheckoutButton();
  };

  // ---------- Form versturen (indien nodig) ----------
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
});