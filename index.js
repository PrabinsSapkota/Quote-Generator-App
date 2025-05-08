let history = [];
let currentIndex = -1;
let hasGoneBack = false; 


async function searchQuotes() {
  const categorySelect = document.getElementById("categorySelect");
  let category = categorySelect.value;
  const container = document.getElementById("quoteContainer");
  container.innerHTML = "";

  try {
    let quoteText = "";

    
    if (category === "all") {
      const allCategories = ["catFacts", "motivational", "numberFacts"];
      const randomIndex = Math.floor(Math.random() * allCategories.length);
      category = allCategories[randomIndex];
    }
    if (category === "catFacts") {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      quoteText = data.fact;

    } else if (category === "motivational") {
      const response = await fetch('https://api.quotable.io/quotes/random');
      const data = await response.json();
      const quote = data[0];
      quoteText = `"${quote.content}" — ${quote.author}`;

    } else if (category === "numberFacts") {
      const response = await fetch('http://numbersapi.com/random/trivia');
      quoteText = await response.text();

    } else {
      quoteText = "No quotes available for this category.";
    }

    history = history.slice(0, currentIndex + 1);
    history.push(quoteText);
    currentIndex++;

    displayQuote(quoteText);
    hasGoneBack = false;
    updateButtonsState();

  } catch (error) {
    container.textContent = `Failed to fetch fact for category: ${category}`;
    console.error("Error fetching quote/fact:", error);
  }
}

function displayQuote(text) {
  const container = document.getElementById("quoteContainer");
  container.innerHTML = "";

  const p = document.createElement("p");
  p.textContent = text;
  p.style.fontSize = `${currentFontSize}px`;
  container.appendChild(p);
  document.getElementById("fontControls").style.display = "flex";
}
function showPreviousQuote() {
  if (currentIndex > 0) {
    currentIndex--;
    hasGoneBack = true;
    displayQuote(history[currentIndex]);
    updateButtonsState();
  }
}

function showNextQuote() {
  if (currentIndex < history.length - 1) {
    currentIndex++;
    displayQuote(history[currentIndex]);
    updateButtonsState();
  }
}

function updateButtonsState() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");


  if (currentIndex > 0) {
    prevBtn.style.display = "inline-block";
    prevBtn.disabled = false;
  } else {
    prevBtn.style.display = "none";
  }

  if (hasGoneBack && currentIndex < history.length - 1) {
    nextBtn.style.display = "inline-block";
    nextBtn.disabled = false;
  } else {
    nextBtn.style.display = "none";
  }
}
function changingModes() {
  const body = document.body;
  const themeIcon = document.getElementById("changingModes");

  body.classList.toggle("dark-mode");
  themeIcon.textContent = body.classList.contains("dark-mode")
    ? "dark_mode"
    : "light_mode";
}
let currentFontSize = 18;

function increaseFontSize() {
  currentFontSize = Math.min(36, currentFontSize + 2);
  updateQuoteFontSize();
}

function decreaseFontSize() {
  currentFontSize = Math.max(12, currentFontSize - 2);
  updateQuoteFontSize();
}

function updateQuoteFontSize() {
  const quoteElement = document.getElementById("quoteContainer").querySelector("p");
  if (quoteElement) {
    quoteElement.style.fontSize = `${currentFontSize}px`;
  }
}

