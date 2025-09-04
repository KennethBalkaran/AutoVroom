document.addEventListener("DOMContentLoaded", () => {
  // Elementen uit de checkout pagina
  const pakketNaamEl   = document.getElementById("pakket-naam");
  const pakketPrijsEl  = document.getElementById("pakket-prijs");
  const totaalPrijsEl  = document.getElementById("totaal-prijs");
  const confirmBtn     = document.getElementById("confirm-btn");

  // Extra kosten/korting
  const INSCHRIJFKOSTEN = 39.5;
  const KORTING         = 50;

  // Haal pakket op uit localStorage
  const pakketNaam  = localStorage.getItem("pakketNaam");
  const pakketPrijs = parseFloat(localStorage.getItem("pakketPrijs"));

  // Controleer of er een pakket gekozen is
  if (pakketNaam && !isNaN(pakketPrijs)) {
    // Toon gekozen pakket
    pakketNaamEl.textContent  = pakketNaam;
    pakketPrijsEl.textContent = `€ ${pakketPrijs.toFixed(2)}`;

    // Bereken totaal
    const totaal = pakketPrijs + INSCHRIJFKOSTEN - KORTING;
    totaalPrijsEl.textContent = `€ ${totaal.toFixed(2)}`;
  } else {
    // Geen pakket gekozen
    pakketNaamEl.textContent  = "Geen pakket gekozen";
    pakketPrijsEl.textContent = "€ 0,00";
    totaalPrijsEl.textContent = "€ 0,00";
  }

  // Klik op bevestigen
  confirmBtn.addEventListener("click", () => {
    alert("Bedankt voor je bestelling! (hier zou de betaling starten)");
    // 👉 Hier kan later een echte betaal-API koppeling komen
  });
});
