/* ============================================================
   DIC-1 Personal Page — live clock + greeting + 12H/24H toggle
   ============================================================
   Core idea: the browser re-reads the current time once per
   second and rewrites it into the page. That "the page changes
   AFTER it loaded, driven by JS" is what this assignment tests.
   ============================================================ */

(function () {
  "use strict";

  var clockEl    = document.getElementById("clock");
  var greetingEl = document.getElementById("greeting");
  var toggleEl   = document.getElementById("format-toggle");

  // Default display mode. true = 24-hour (14:05:03), false = 12-hour (2:05:03 PM)
  var use24Hour = true;

  // Always show two digits: 5 -> "05"
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  // Pick a greeting from the hour (0–23)
  function greetingFor(hour) {
    if (hour < 5)  return "Good night";
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  // Read the current time and write it into the page
  function render() {
    var now = new Date();
    var h24 = now.getHours();
    var mins = now.getMinutes();
    var secs = now.getSeconds();

    greetingEl.textContent = greetingFor(h24);

    var hours = h24;
    var suffix = "";
    if (!use24Hour) {
      suffix = h24 < 12 ? " AM" : " PM";
      hours = h24 % 12;
      if (hours === 0) hours = 12; // midnight & noon show as 12, not 0
    }

    var timeText = pad(hours) + ":" + pad(mins) + ":" + pad(secs) + suffix;
    clockEl.textContent = timeText;
    clockEl.setAttribute("datetime", pad(h24) + ":" + pad(mins) + ":" + pad(secs));
  }

  // Keep the toggle button labelled by what it will DO next
  function updateToggleLabel() {
    if (use24Hour) {
      toggleEl.textContent = "12H";
      toggleEl.setAttribute("aria-label", "Switch clock to 12-hour format");
    } else {
      toggleEl.textContent = "24H";
      toggleEl.setAttribute("aria-label", "Switch clock to 24-hour format");
    }
  }

  toggleEl.addEventListener("click", function () {
    use24Hour = !use24Hour;
    updateToggleLabel();
    render(); // update immediately instead of waiting up to a second
  });

  // Start
  updateToggleLabel();
  render();
  setInterval(render, 1000); // re-render every 1000 ms = 1 second
})();
