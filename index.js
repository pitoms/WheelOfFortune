// Here's the flow
// A user can start the game
// which triggers a repetitive flow of game function

let score = 0;

function driver() {
  console.log(validAnswer("ABC___"));
  round();
}

function clear() {
  round();
}

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
  document.getElementById("consLeft").innerText = consonants;
  document.getElementById("vowsLeft").innerText = vowels;
  document.getElementById("guesses").innerText = "";

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
      if (consonants + vowels == 0 && !wordGuessPrompted) {
        if (answer === dispStr) {
          window.alert("Win");
          round();
          return;
        }

        let form = document.createElement("form");
        form.id = "form";
        let input = document.createElement("input");
        input.id = "input";
        input.type = "text";

        let submit = document.createElement("input");
        submit.id = "submit";
        submit.type = "submit";

        form.appendChild(input);
        form.appendChild(submit);

        document.getElementById("lowerBoard").appendChild(form);
        wordGuessPrompted = true;
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          if (input.value.toLowerCase() === answer.toLowerCase()) {
            document.getElementById("board").innerText = answer;
            window.alert("win");
            score++;
          } else {
            window.alert("you lose, the word was" + ` ${answer}`);
          }
        });
        return;
      } else {
        if ((vowels == 0 && isVowel(event.key)) || (consonants == 0 && isConsonant(event.key))) {
          return;
        }

        if (answer.includes(event.key.toUpperCase()) && !dispStr.includes(event.key.toUpperCase())) {
          displayableChars = new RegExp(`[^${displayableChars.toString().substring(3, displayableChars.toString().length - 3)}${event.key.toUpperCase()}]`, "g");
          dispStr = answer.replace(displayableChars, "_");
          document.getElementById("board").innerText = dispStr;
        }

        guessedLetters.add(event.key.toLowerCase());
        document.getElementById("guesses").innerText += `${event.key.toUpperCase()} `;
      }

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

      if (answer === dispStr) {
        window.alert("Win");
        round();
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

function isVowel(str) {
  return str.toLowerCase().match(/[aeiou]/g);
}

function isConsonant(str) {
  return str.toLowerCase().match(/[^aeiou]/g);
}
