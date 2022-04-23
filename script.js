const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
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
setTimeout(()=>{
  const elements=document.querySelectorAll("#game > div");
  for(let element of elements){
    element.setAttribute("style","background-color:gray");
  }
},2000);
let lastClickedImage=""
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const clickedCard= event.target.classList[0];
  console.log(clickedCard);
  if(!lastClickedImage){
    lastClickedImage=clickedCard;
    event.target.setAttribute("style",`background-color:${clickedCard}`);
  }
  else if(clickedCard!==lastClickedImage){
    event.target.setAttribute("style",`background-color:${clickedCard}`);
    gameContainer.setAttribute("style","pointer-events:none");
    const myPromise= new Promise((res,rej)=>{setTimeout(()=>{event.target.setAttribute("style","background-color:gray");
  res();},1000)});
  myPromise.then(gameContainer.setAttribute("style","pointer-events:auto"));
    
  }
  else{
    lastClickedImage="";
    event.target.setAttribute("style",`background-color:${clickedCard}`);
  }
  
  console.log("you clicked",event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

// ...To be used in bonus task..... 

// setTimeout(()=>{
//   const elements=document.querySelectorAll("#game > div");
//   for(let element of elements){
//     element.setAttribute("style","background-color:black;background-image:none");
//   }
// },2000);
// let lastClickedImage=""
// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   const clickedCard= event.target.classList[0];
//   const clickedCardGif= COLORS.indexOf(clickedCard) + 1;
//   console.log(clickedCard,clickedCardGif);
//   if(!lastClickedImage){
//     lastClickedImage=clickedCard;
//     event.target.setAttribute("style",`background-image:./gifs/${clickedCardGif}.gif`);
//   }
//   else if(clickedCard!==lastClickedImage){
//     event.target.setAttribute("style",`background-image:./gifs/${clickedCardGif}.gif`);
//     setTimeout(()=>{event.target.setAttribute("style","background-color:black;background-image:none");},2000);
    
//   }
//   else{
//     lastClickedImage="";
//     event.target.setAttribute("style",`background-image:./gifs/${clickedCardGif}.gif`);
//   }
  
//   console.log("you clicked",event.target);
// }
