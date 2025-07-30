document.getElementById('themeSelect').addEventListener('change', function () {
  document.body.className = this.value;
});

function saveEntry() {
  alert("Your journal entry has been saved!");
}

function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const msg = input.value.trim();
  if (!msg) return;

  const messages = document.getElementById('chatMessages');

  const userDiv = document.createElement('div');
  userDiv.textContent = msg;
  userDiv.style.marginBottom = '5px';
  messages.appendChild(userDiv);

  const reply = document.createElement('div');
  reply.className = 'blushy';
  reply.textContent = getBlushyResponse(msg);
  messages.appendChild(reply);

  input.value = '';
  messages.scrollTop = messages.scrollHeight;
}

function getBlushyResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes("sad")) return "I'm here for you. Wanna talk about it? 🌸";
  if (lower.includes("happy")) return "Yay! I love happy days 💖";
  if (lower.includes("anxious")) return "Breathe in... Breathe out... You’ve got this. 💫";
  return "I'm listening 💕";
}
