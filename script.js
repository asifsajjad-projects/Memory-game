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
else{
    if (localStorage.getItem("bestScore") != 10000) {
        document.getElementById("best-score").innerText = localStorage.getItem("bestScore");
    }
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
        // newDiv.addEventListener("click", handleCardClick);
        const flip = document.createElement("div");
        flip.classList.add("flip-container");
        const innerChildDiv = document.createElement("div");
        innerChildDiv.classList.add(`inner`);
        innerChildDiv.classList.add(`inner-${gif}`);
        const outerChildDiv = document.createElement("div");
        outerChildDiv.classList.add(`outer`);
        outerChildDiv.classList.add(`outer-${gif}`);
        outerChildDiv.addEventListener("click", handleCardClick);
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
let clickCounter = 0;
let prevRemovedClick = "";

// Add click listeners to the divs in game

function handleCardClick(event) {
    console.log(event.target);
    clickCounter++;
    const clickedCard = event.target.offsetParent.offsetParent.classList[0];
    const myEvent = event.target.offsetParent;
    // myEvent.setAttribute("style", "pointer-events:none");
    event.target.removeEventListener("click", handleCardClick);
    GLOBALVAR.score += 1;
    document.querySelector(".display").innerText = GLOBALVAR.score;

    if (clickCounter === 1) {
        GLOBALVAR.lastClickedImage = clickedCard;
        //   Rotate the card to see the GIF
        myEvent.classList.toggle("flip-card");
        prevEvent = myEvent;
        prevRemovedClick = event.target;
    }
    else if (clickCounter === 2) {
        if (clickedCard === GLOBALVAR.lastClickedImage) {
            myEvent.classList.toggle("flip-card");
            GLOBALVAR.lastClickedImage = "";
            myEvent.setAttribute("style", "pointer-events:none");
            prevEvent.setAttribute("style", "pointer-events:none");
            GLOBALVAR.matchCounter++;
            document.getElementById("matched").innerText= GLOBALVAR.matchCounter;
            clickCounter = 0;
            if (GLOBALVAR.matchCounter === 12) {
                gameContainer.innerHTML = `<p class="game-over"> Nice done!!! <br> Your score is: ${GLOBALVAR.score}</p>`;
                if (localStorage.getItem("bestScore") > GLOBALVAR.score) {
                    localStorage.setItem("bestScore", GLOBALVAR.score);
                }
                document.getElementById("curr-score").innerText = GLOBALVAR.score;
            }
        }

        else {

            // Rotate the card to see both the cards for 1 sec
            gameContainer.setAttribute("style", "pointer-events:none");
            myEvent.classList.toggle("flip-card");
            setTimeout(() => {
                // Rotate the cards back again to hidden
                myEvent.classList.toggle("flip-card");
                prevEvent.classList.toggle("flip-card");
                event.target.addEventListener("click", handleCardClick);
                prevRemovedClick.addEventListener("click", handleCardClick);

                // myEvent.setAttribute("style", "pointer-events:auto");
                // prevEvent.setAttribute("style", "pointer-events:auto");
                gameContainer.setAttribute("style", "pointer-events:auto");
                clickCounter = 0;
            }, 600);

            GLOBALVAR.lastClickedImage = "";
        }
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
    document.querySelector('#main-game').setAttribute("style","display:flex");
    document.querySelector('#start-section').setAttribute("style","display:none");
    GLOBALVAR.lastClickedImage = "";
    GLOBALVAR.score = 0;
    GLOBALVAR.matchCounter = 0;
    document.querySelector(".display").innerText = "";
});

// Reset button functionality

document.getElementById("reset-btn").addEventListener("click", (e) => {
    document.getElementById("reset-msg").setAttribute("style","display:flex");
    
});

document.getElementById("yes").addEventListener("click", (e) => {
    document.getElementById("reset-msg").setAttribute("style","display:none");
    GLOBALVAR.lastClickedImage = "";
    GLOBALVAR.score = 0;
    GLOBALVAR.matchCounter = 0;
    shuffledGifs = shuffle(GIFS);
    gameContainer.innerHTML = "";
    createDivsForGifs(shuffledGifs);
    document.querySelector(".display").innerText = "";
    document.getElementById("matched").innerText= GLOBALVAR.matchCounter;
    
    if (localStorage.getItem("bestScore") != 10000) {
        document.getElementById("best-score").innerText = localStorage.getItem("bestScore");
    }
    
});

document.getElementById("no").addEventListener("click", (e) => {
    document.getElementById("reset-msg").setAttribute("style","display:none");
    
});