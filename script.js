const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

const detailButtons = document.querySelectorAll(".details-btn");
const toast = document.getElementById("toast");

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  });
});
