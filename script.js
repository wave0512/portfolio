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
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatArea = document.getElementById("chatArea");

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/2i530r962bwlhqk7w2vuhvcchxpd0ple";

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatArea.appendChild(message);
  chatArea.scrollTop = chatArea.scrollHeight;
}

if (chatForm && chatInput && chatArea) {
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    chatInput.value = "";

    addMessage("답변을 생성하는 중입니다...", "bot");
    const loadingMessage = chatArea.lastElementChild;

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      const data = await response.json();
      loadingMessage.textContent = data.answer || "답변을 불러오지 못했습니다.";
    } catch (error) {
      loadingMessage.textContent =
        "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
  });
}
