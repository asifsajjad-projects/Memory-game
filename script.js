// Select Game container

const gameContainer = document.getElementById("game");

// Store the gifs in array 
const GIFS = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
];

// Set the local storage

if (!localStorage.getItem("bestScore")) {
    localStorage.setItem("bestScore", 10000);
}

//   Create an object to store global variables 

const GLOBALVAR = {
    lastClickedImage: "",
    score: 0,
    matchCounter: 0
}

// Shuffle the tiles randomly

function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

// Store the shuffled elements in a new array

let shuffledGifs = shuffle(GIFS);

// Create game tiles

function createDivsForGifs(gifArray) {
    let dcounter = 0;
    for (let gif of gifArray) {
        dcounter++;

        const newDiv = document.createElement("div");
        newDiv.classList.add(gif);
        newDiv.addEventListener("click", handleCardClick);
        const flip = document.createElement("div");
        flip.classList.add("flip-container");
        const innerChildDiv = document.createElement("div");
        innerChildDiv.classList.add(`inner`);
        innerChildDiv.classList.add(`inner-${gif}`);
        const outerChildDiv = document.createElement("div");
        outerChildDiv.classList.add(`outer`);
        outerChildDiv.classList.add(`outer-${gif}`);
        flip.append(innerChildDiv);
        flip.append(outerChildDiv);
        newDiv.append(flip);
        gameContainer.append(newDiv);

        if (dcounter === 12) {
            const newDiv2 = document.createElement("div");
            newDiv2.classList.add("display");
            newDiv2.addEventListener("click", handleCardClick);
            gameContainer.append(newDiv2);
        }
    }

}

// Store the previous event
let prevEvent = "";


// Add click listeners to the divs in game

function handleCardClick(event) {
    // console.log(event);
    // console.log(event.target.offsetParent.offsetParent.classList[0]);
    const clickedCard =  event.target.offsetParent.offsetParent.classList[0];
    const myEvent= event.target.offsetParent;
    // console.log(event);
    // console.log(event.path[2].classList[0]);
    // event.path[1].classList.toggle("flip-card");
    GLOBALVAR.score += 1;
    document.querySelector(".display").innerText = GLOBALVAR.score;
    // // Delete this part later
    // console.log(clickedCard, clickedCard2);
    // console.log(lastClickedImage);

    if (!GLOBALVAR.lastClickedImage) {
        GLOBALVAR.lastClickedImage = clickedCard;
        //   Rotate the card to see the GIF
        myEvent.classList.toggle("flip-card");
        // console.log(event.path[1].classList);
        prevEvent = myEvent;
        // console.log(prevEvent);

    }
    else if (clickedCard !== GLOBALVAR.lastClickedImage) {
        // Rotate the card to see both the cards for 1 sec
        gameContainer.setAttribute("style", "pointer-events:none");
        myEvent.classList.toggle("flip-card");
        setTimeout(() => {
            // Rotate the cards back again to hidden
            myEvent.classList.toggle("flip-card");
            // console.log(event.path[1].classList);
            // console.log(prevEvent);

            prevEvent.classList.toggle("flip-card");
            gameContainer.setAttribute("style", "pointer-events:auto");
        }, 1000);
        GLOBALVAR.lastClickedImage = "";
        // GLOBALVAR.lastEvent="";
    }

    else {
        // Delete this later
        // console.log("match!");
        // Rotate both the cards
        myEvent.classList.toggle("flip-card");
        GLOBALVAR.lastClickedImage = "";
        myEvent.setAttribute("style", "pointer-events:none");
        prevEvent.setAttribute("style", "pointer-events:none");
        GLOBALVAR.matchCounter++;
        if (GLOBALVAR.matchCounter === 12) {
            gameContainer.innerHTML = `<div class="game-over"> Nice done!!! \n Your score is: ${GLOBALVAR.score}</div>`;
            if (localStorage.getItem("bestScore") > GLOBALVAR.score) {
                localStorage.setItem("bestScore", GLOBALVAR.score);
            }
            document.getElementById("curr-score").innerText = GLOBALVAR.score;
        }
        // GLOBALVAR.lastEvent="";
    }

    // console.log("you clicked", event.target);
}

// Render the shuffled divs

createDivsForGifs(shuffledGifs);

// Display the best score

if (localStorage.getItem("bestScore") != 10000) {
    document.getElementById("best-score").innerText = localStorage.getItem("bestScore");
}

// Start button functionality

document.getElementById("start-btn").addEventListener("click", (e) => {
    // console.log("start clicked");
    GLOBALVAR.lastClickedImage = "";
    GLOBALVAR.score = 0;
    GLOBALVAR.matchCounter = 0;
    document.querySelector(".display").innerText = "";
});

// Reset button functionality

document.getElementById("reset-btn").addEventListener("click", (e) => {
    // console.log("start clicked");
    GLOBALVAR.lastClickedImage = "";
    GLOBALVAR.score = 0;
    GLOBALVAR.matchCounter = 0;
    shuffledGifs = shuffle(GIFS);
    gameContainer.innerHTML = "";
    createDivsForGifs(shuffledGifs);
    document.querySelector(".display").innerText = "";
    if (localStorage.getItem("bestScore") != 10000) {
        document.getElementById("best-score").innerText = localStorage.getItem("bestScore");
    }
});