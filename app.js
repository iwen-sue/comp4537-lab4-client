const API_BASE_URL = "https://api.grace-su.com/api/definitions";

function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) {
    showResult("Please enter a word to search.");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_BASE_URL}/search`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        showResult(
          `Definition of "${response.searchObj.word}": ${response.searchObj.definition}`
        );
      } else if (this.status === 404) {
        showResult(`Word "${word}" not found in the dictionary.`);
      } else {
        showResult("An error occurred while searching for the word.");
      }
    }
  };
  xhr.send(JSON.stringify({ word }));
}

function addWord() {
  const word = document.getElementById("wordInput").value.trim();
  const definition = document.getElementById("definitionInput").value.trim();

  if (!word || !definition) {
    showResult("Please enter both a word and its definition.");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_BASE_URL}/add`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        showResult(
          `Word "${response.storedObj.word}" successfully added to the dictionary.`
        );
        clearInputs();
      } else if (this.status === 500) {
        showResult(`Warning! "${word}" already exists in the dictionary.`);
      } else {
        showResult("An error occurred while adding the word.");
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
