import strings from "./lang/en/en.js";

const API_BASE_URL = "https://api.grace-su.com/api/definitions";

function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) {
    showResult(strings.enterWordToSearch);
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${API_BASE_URL}?word=${encodeURIComponent(word)}`, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        showResult(strings.definitionOf(response.word, response.definition));
      } else if (this.status === 404) {
        showResult(strings.wordNotFound(word));
      } else {
        showResult(strings.searchError);
      }
    }
  };
  xhr.send();
}

function addWord() {
  const word = document.getElementById("wordInput").value.trim();
  const definition = document.getElementById("definitionInput").value.trim();

  if (!word || !definition) {
    showResult(strings.enterWordAndDefinition);
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_BASE_URL}/add`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        showResult(strings.wordAdded(response.storedObj.word));
        clearInputs();
      } else if (this.status === 500) {
        showResult(strings.wordExists(word));
      } else {
        showResult(strings.addError);
      }
    }
  };
  xhr.send(JSON.stringify({ word, definition }));
}

function showResult(message) {
  document.getElementById("result").textContent = message;
}

function clearInputs() {
  document.getElementById("wordInput").value = "";
  document.getElementById("definitionInput").value = "";
}

// Make functions available globally
window.searchWord = searchWord;
window.addWord = addWord;
