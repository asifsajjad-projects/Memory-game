const gameContainer = document.getElementById("game");
if (!localStorage.getItem("score")) {
  localStorage.setItem("score", 0);
}
if (!localStorage.getItem("falseClicks")) {
  localStorage.setItem("falseClicks", 120);
}
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
function greyOutCards() {
  const elements = document.querySelectorAll("#game > div");
  for (let element of elements) {
    element.setAttribute("style", "background-color:gray;");
  }
}

let lastClickedImage = "";
let score = 0, falseClicks = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const clickedCard = event.target.classList[0];
  console.log(clickedCard);
  console.log(lastClickedImage);
  if (!lastClickedImage) {
    lastClickedImage = clickedCard;
    event.target.setAttribute("style", `background-color:${clickedCard};pointer-events:none`);
  }
  else if (clickedCard !== lastClickedImage) {
    event.target.setAttribute("style", `background-color:${clickedCard}`);
    gameContainer.setAttribute("style", "pointer-events:none");
    setTimeout(() => {
      event.target.setAttribute("style", "background-color:gray");
      gameContainer.setAttribute("style", "pointer-events:auto");
    }, 500);
    falseClicks += 1;
    document.getElementById("false-clicks").innerText = falseClicks;
  }
  else {
    console.log("match!");
    lastClickedImage = "";
    event.target.setAttribute("style", `background-color:${clickedCard};pointer-events:none`);
    score += 1;
    document.getElementById("points").innerText = score;
  }

  console.log("you clicked", event.target);
}

// Timer function
function timedOut() {
  console.log("timeout");
  gameContainer.innerHTML = `<article class="time-out"><p>Time Over!!!</p> Your Score: ${falseClicks} miss, ${score} hit.</article>`;
}

let resetClicked = false;

function displayTimer() {
  let remainingTime = 30;

  let myInterval = setInterval(() => {
    remainingTime -= 1;
    document.getElementById("time").innerText = remainingTime;
    if (remainingTime < 1) {
      clearInterval(myInterval);
      timedOut();
      if (score > localStorage.getItem("score")) {
        gameContainer.innerHTML = `<article class="time-out"><p>Hooray!!! Previous record broken. </p> Your Score: ${falseClicks} miss, ${score} hit.</article>`;
        localStorage.setItem("score", score);
      }
      else if (score === localStorage.getItem("score") && falseClicks < localStorage.getItem("falseClicks")) {
        gameContainer.innerHTML = `<article class="time-out"><p>Hooray!!! Previous record broken. </p> Your Score: ${falseClicks} miss, ${score} hit.</article>`;
        localStorage.setItem("falseClicks", falseClicks);
      }
      else {
        localStorage.setItem("falseClicks", falseClicks);
      }
    }
    if (score === 6) {
      console.log("game over");
      clearInterval(myInterval);
      localStorage.setItem("score", score);
      gameContainer.innerHTML = `<article class="time-out"><p>Nice Done!!!</p> Your Score: ${falseClicks} miss, ${score} hit.</article>`;
      if (falseClicks < localStorage.getItem("falseClicks")) {
        gameContainer.innerHTML = `<article class="time-out"><p>Hooray!!! Previous record broken. </p> Your Score: ${falseClicks} miss, ${score} hit.</article>`;
        localStorage.setItem("falseClicks", falseClicks);
      }
    }
    if (resetClicked) {
      clearInterval(myInterval);
      resetClicked = false;
      // document.getElementById("reset-btn").setAttribute("style",`pointer-events:none`);
      document.getElementById("time").innerText = 30;
    }
  }, 1000);

}

// when the DOM loads
createDivsForColors(shuffledColors);

document.getElementById("start-btn").addEventListener("click", (e) => {
  lastClickedImage = "";
  score = 0;
  falseClicks = 0;
  document.getElementById("points").innerText = score;
  document.getElementById("false-clicks").innerText = falseClicks;
  greyOutCards();
  displayTimer();
  resetClicked = false;
  document.getElementById("reset-btn").setAttribute("style", `pointer-events:auto`);
  document.getElementById("start-btn").setAttribute("style", `pointer-events:none`);
});

document.getElementById("reset-btn").addEventListener("click", (e) => {
  lastClickedImage = "";
  score = 0;
  falseClicks = 0;
  document.getElementById("points").innerText = score;
  document.getElementById("false-clicks").innerText = falseClicks;
  gameContainer.innerHTML = "";
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  document.getElementById("time").innerText = 30;
  resetClicked = true;
  document.getElementById("reset-btn").setAttribute("style", `pointer-events:none`);
  document.getElementById("start-btn").setAttribute("style", `pointer-events:auto`);
  document.getElementById("record-points").innerText = `Best score:\n ${localStorage.getItem("score")} hits, ${localStorage.getItem("falseClicks")} misses.`;
});


