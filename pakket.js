const pakketKnoppen = document.querySelectorAll(".pakket-btn");
const gekozenInfo = document.getElementById("gekozen-info");

let gekozenPakket = null;

pakketKnoppen.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pakket = btn.getAttribute("data-pakket");
    const prijs = btn.getAttribute("data-prijs");

    // Als dit pakket al gekozen is -> deselecteren
    if (gekozenPakket === pakket) {
      gekozenPakket = null;
      gekozenInfo.textContent = "Nog geen pakket gekozen";

      pakketKnoppen.forEach((b) => {
        b.disabled = false;
        b.textContent = "Kies dit pakket";
        b.style.background = "#fd3643";
      });
      return;
    }

    // Nieuw pakket kiezen
    gekozenPakket = pakket;
    gekozenInfo.textContent = `${pakket} - €${prijs},- is gekozen`;

    pakketKnoppen.forEach((b) => {
      if (b !== btn) {
        b.disabled = true;
      } else {
        b.textContent = "✔ Gekozen";
        b.style.background = "#28a745";
      }
    });
  });
});
