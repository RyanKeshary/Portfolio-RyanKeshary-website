// Matrix Rain Background
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンカタカナ漢字仮名";
const chars = matrixChars.split("");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -100;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (Math.random() > 0.975) {
      ctx.fillStyle = "#fff";
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      ctx.fillStyle = "#0f0";
    }

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const newColumns = canvas.width / fontSize;
  drops.length = 0;
  for (let i = 0; i < newColumns; i++) {
    drops[i] = Math.random() * -100;
  }
});

// Page transition functionality
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("page-loaded");

  const redPillBtn = document.querySelector(".red-pill");
  const bluePillBtn = document.querySelector(".blue-pill");

  if (redPillBtn) {
    redPillBtn.addEventListener("click", function (e) {
      e.preventDefault();
      transitionToPage("./retro.html");
    });
  }

  if (bluePillBtn) {
    bluePillBtn.addEventListener("click", function (e) {
      e.preventDefault();
      transitionToPage("./future.html");
    });
  }

  function transitionToPage(url) {
    document.body.classList.add("page-transition");
    setTimeout(function () {
      window.location.href = url;
    }, 500);
  }
});

// Email copy functionality
document.addEventListener("DOMContentLoaded", function () {
  const emailLink = document.getElementById("emailLink");
  const notification = document.getElementById("copyNotification");

  if (emailLink && notification) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const email = this.getAttribute("data-email");

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(email)
          .then(function () {
            showNotification();
          })
          .catch(function (err) {
            fallbackCopyText(email);
          });
      } else {
        fallbackCopyText(email);
      }
    });
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "2em";
    textarea.style.height = "2em";
    textarea.style.padding = "0";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.boxShadow = "none";
    textarea.style.background = "transparent";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        showNotification();
      }
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }

    document.body.removeChild(textarea);
  }

  function showNotification() {
    notification.classList.add("show");
    setTimeout(function () {
      notification.classList.remove("show");
    }, 3000);
  }
});
