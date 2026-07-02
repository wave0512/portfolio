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
const makeWebhookUrl = "https://hook.eu1.make.com/2i530r962bwlhqk7w2vuhvcchxpd0ple";

function addChatMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatArea.appendChild(message);
  chatArea.scrollTop = chatArea.scrollHeight;
  return message;
}

if (chatForm && chatInput && chatArea) {
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addChatMessage(userMessage, "user");
    chatInput.value = "";

    const loadingMessage = addChatMessage("답변을 생성하는 중입니다...", "bot");

    try {
      const response = await fetch(makeWebhookUrl, {
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
        "연결 오류가 발생했습니다. Make 시나리오가 켜져 있는지 확인해주세요.";
    }
  });
}
