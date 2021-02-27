// Here's the flow
// A user can start the game
// which triggers a repetitive flow of game function

function driver() {
  console.log(validAnswer("ABC___"));
  round();
}

function clear() {}

function round() {
  // Generate underscores and show keyboard
  // on press show char
  // check if valid press otherwise nudge and modal hint
  // animate roll across screen and hop attempt into word
  //on end animation -
  // After 4 presses determine if word was right
  // add to score on top left

  let answer = getRandomWord().toUpperCase();
  let displayableChars = /[^RSTLNE]/g;
  let dispStr = answer.replace(displayableChars, "_");

  // Better word generation with atleast 4 underscores
  while (!validAnswer(dispStr)) {
    answer = getRandomWord().toUpperCase();
    dispStr = answer.replace(displayableChars, "_");
    console.log("Trying to find a better answer");
  }

  let consonants = 3;
  let vowels = 1;

  let guessedLetters = new Set();

  let wordGuessPrompted = false;

  console.log(answer);
  document.getElementById("board").innerText = dispStr;

  window.addEventListener("keydown", (event) => {
    console.log(guessedLetters);
    if (wordGuessPrompted) {
      // Indicates stage of game is past letter guessing  prob can do this with events somehow
      return;
    }
    if (!guessedLetters.has(event.key.toLowerCase())) {
      if (event.key.toLowerCase().match(/[b-df-hj-np-tv-z]/g)) {
        if (consonants > 0) {
          consonants--;
          document.getElementById("consLeft").innerText = consonants;
        }
        console.log(consonants);
      } else if (event.key.toLowerCase().match(/[aeiou]/g)) {
        if (vowels > 0) {
          vowels--;
          document.getElementById("vowsLeft").innerText = vowels;
        }
        console.log(vowels);
      }

      guessedLetters.add(event.key.toLowerCase());
      document.getElementById("guesses").innerText += `${event.key.toUpperCase()} `;

      if (consonants + vowels == 0 && !wordGuessPrompted) {
        if (answer == dispStr) {
          window.alert("Win");
          return;
        }
        document.getElementById("input").appendChild(document.createElement("input"));
        wordGuessPrompted = true;
        return;
      } else {
        // freely accept letters
        // if the letter is one of the underscores
        if (answer.includes(event.key.toUpperCase()) && !dispStr.includes(event.key.toUpperCase())) {
          displayableChars = new RegExp(`[^${displayableChars.toString().substring(3, displayableChars.toString().length - 3)}${event.key.toUpperCase()}]`, "g");
          dispStr = answer.replace(displayableChars, "_");
          document.getElementById("board").innerText = dispStr;
        }
      }
      if (answer == dispStr) {
        window.alert("Win");
      }
    }
  });
}

driver();

function validAnswer(dispStr) {
  let count = 0;
  for (let char of dispStr) {
    if (char == "_") {
      count++;
    }
  }
  if (count >= 4) {
    return true;
  }

  return false;
}
