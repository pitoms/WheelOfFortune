// Here's the flow
// A user can start the game
// which triggers a repetitive flow of game function

function driver() {
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
  let consonants = 3;
  let vowels = 1;

  window.alert(answer);
  document.getElementById("board").innerText = dispStr;

  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase().match(/[b-df-hj-np-tv-z]/g)) {
      consonants--;
    } else if (event.key.toLowerCase().match(/[aeiou]/g)) {
      vowels--;
    }
    if (consonants + vowels === 1) {
      // only accept inputs of the one that is left
      window.alert("only one key left");
    } else {
      // freely accept letters
      // if the letter is one of the underscores
      if (answer.includes(event.key.toUpperCase()) && !dispStr.includes(event.key.toUpperCase())) {
        displayableChars = new RegExp(`[^${displayableChars.toString().substring(3, displayableChars.toString().length - 3)}${event.key.toUpperCase()}]`, "g");
        dispStr = answer.replace(displayableChars, "_");
        document.getElementById("board").innerText = dispStr;
      }
    }
  });
}

driver();
