document.addEventListener("DOMContentLoaded", () => {
  const pakketNaam  = localStorage.getItem("pakketNaam");
  const pakketPrijs = localStorage.getItem("pakketPrijs");

  const checkoutBox = document.getElementById("checkout-box");

  if (!pakketNaam || !pakketPrijs) {
    checkoutBox.innerHTML = `
      <h2>Geen pakket gevonden</h2>
      <p>Keer terug naar de <a href="index.html">pakketten pagina</a> om een pakket te kiezen.</p>
    `;
    return;
  }

  const prijs = parseFloat(pakketPrijs);
  const INSCHRIJFKOSTEN = 39.5;
  const KORTING = 50;
  const totaal = prijs + INSCHRIJFKOSTEN - KORTING;

  checkoutBox.innerHTML = `
    <h2>Betaling afronden</h2>
    <div class="checkout-item">
      <span>${pakketNaam}</span>
      <span>€ ${prijs.toFixed(2)}</span>
    </div>
    <div class="checkout-item">
      <span>Inschrijfkosten</span>
      <span>€ ${INSCHRIJFKOSTEN.toFixed(2)}</span>
    </div>
    <div class="checkout-item discount">
      <span>Online korting</span>
      <span>- € ${KORTING.toFixed(2)}</span>
    </div>
    <div class="checkout-total">
      <strong>Totaal te betalen:</strong>
      <strong>€ ${totaal.toFixed(2)}</strong>
    </div>
    <button id="afronden-btn" class="afronden-btn">Betaling afronden</button>
  `;

  // Simuleer betaling
  const afrondenBtn = document.getElementById("afronden-btn");
  afrondenBtn.addEventListener("click", () => {
    alert("Bedankt voor je bestelling! 🎉");
    localStorage.removeItem("pakketNaam");
    localStorage.removeItem("pakketPrijs");
    window.location.href = "index.html";
  });
});
