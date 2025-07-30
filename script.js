const input = document.getElementById("journalInput");
const entriesContainer = document.getElementById("entriesContainer");
const streakDisplay = document.getElementById("streakCount");

function formatDateOnly(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function saveEntry() {
  const entry = input.value.trim();
  if (!entry) return;

  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  const today = formatDateOnly(new Date());

  if (!entries.find(e => e.date === today)) {
    entries.push({ date: today, content: entry });
    localStorage.setItem("entries", JSON.stringify(entries));
    localStorage.setItem("lastSavedDate", today);
    updateStreak();
    displayEntries();
    input.value = "";
  } else {
    alert("You've already journaled today!");
  }
}

function displayEntries() {
  entriesContainer.innerHTML = "";

  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  entries.reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${entry.date}</strong><br>${entry.content}`;
    entriesContainer.appendChild(div);
  });

  const lastSaved = localStorage.getItem("lastSavedDate");
  if (lastSaved) {
    const dateBox = document.createElement("div");
    dateBox.className = "entry";
    dateBox.innerHTML = `<strong>Last Saved Date:</strong> ${lastSaved}`;
    entriesContainer.appendChild(dateBox);
  }
}

function updateStreak() {
  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  const dates = entries.map(e => e.date).sort();
  let streak = 0;
  let today = new Date();

  while (dates.includes(formatDateOnly(today))) {
    streak++;
    today.setDate(today.getDate() - 1);
  }

  streakDisplay.textContent = streak;
}

window.onload = () => {
  displayEntries();
  updateStreak();
};
