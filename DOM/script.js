//----- DOM ELEMENTS
const box = document.createElement("div"); // create new div
box.classList.add("box"); // add box class to the created div
const board = document.querySelector("#board"); // call the #board element
const secondsEl = document.querySelector("#seconds"); // call the timer element
const tensEl = document.querySelector("#tens"); // call the timer element

//----- PROMPT
let value = Number(prompt("Combien de boites voulez-vous ? De 3 à 20."));
// Ask a prompt, and set the value received as an integer

// check if the value is what we want, if not, ask again
while( value < 3 || value > 20 || !Number.isInteger(value) ){
    value = Number(prompt("Merci d'écrire un chiffre entre 3 et 20."));
}

//----- SHUFFLER
function shuffleChildren(parent) {
    let children = parent.children;
    let i = children.length, k , temp; // Initialize i as how many children board as, and k & temp as empty variables
    // Same as
    // let i = board.children.length;
    // let k;
    // let temp;
    while(--i > 0){ // Loop while i - 1 is positive // minus 1 to i at each loop
        k = Math.floor(Math.random() * (i+1)) // define K as a random number based on i
        temp = board.children[k] // temporary set board.children[k] as temp
        board.children[k] = board.children[i] // swap board.children[k] with board.children[i] (i starts at the end and comes at the beginning)
        board.appendChild(temp) // use the temporarily stocked board.children[k] and put it in #board
    }
}

shuffleChildren(board); // Call the function to shuffle all the elements of board

//------ REACTIONS
function showReaction(type, clickedBox){
    clickedBox.classList.add(type); // add corresponding type class to the box
    if(type !== "success"){ // if the type is not success
        setTimeout(function(){
            clickedBox.classList.remove(type) // remove the added class
        }, 800)
    }
}

//----- CLICKABLE ?
let nb = 1; // initialise nb as 1

for(let i = 1; i <= value; i++){ // create a number of boxes decided by the user
    let newBox = box.cloneNode(); // clone box div and set it as newBox
    newBox.innerText = i; // set the inner text as the current value of i
    board.appendChild(newBox); // put the clone with it's number in board

    newBox.addEventListener('click', function(){

        if(i == nb){ // if the box number is the next number to click
            newBox.classList.add('box-clicked'); // add the class
            shuffleChildren(board);// reshuffle the boxes

            if(nb == board.children.length){ // if it's the last box
                board.querySelectorAll(".box").forEach(function(box){
                    // box.classList.remove("box-clicked");
                    showReaction("success", box); // add success reaction to all boxes
                })
                clearInterval(interval); // stop timer
            }

            nb++; // increment nb

        } else if(i > nb){ // if clicking on a higher numbered box
            showReaction("error", newBox); // show the error reaction
            nb = 1; // reset counter
            board.querySelectorAll(".box-clicked").forEach(function(clicked){
                clicked.classList.remove("box-clicked");
            })
            // setTimeout(() => shuffleChildren(board), 800);// reshuffle the boxes () => needed to wait the set time out
            shuffleChildren(board);// reshuffle the boxes
            resetTimer(); // reset timer

        } else { // Only case left, if the number is already clicked
            showReaction("notice", newBox); // show the notice reaction
        }
    });
}

//---- TIMER
let seconds = 0; // set seconds as 0
let tens = 0; // set tens as 0
let interval; // initialise intervalID

tensEl.innerHTML = "O"; // set initial tens content as 0
secondsEl.innerHTML = "O"; // set initial seconds content as 0

function timerSetUp () { // when called, add 1 to tens
    tens++; // add 1 to tens
    
    if(tens <= 9){
      tensEl.innerHTML = "0" + tens; // make it tens are represented as 2 numbers when below 10
    }
    
    if (tens > 9){
      tensEl.innerHTML = tens; // get rid of the 0 when going above 10
    } 
    
    if (tens > 99) { // when reaching 100 tens
      seconds++; // Add 1 to seconds 
      secondsEl.innerHTML = "0" + seconds; // same logic for 2 numbers when below 10
      tens = 0; // reset tens
      tensEl.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      secondsEl.innerHTML = seconds; // same logic gor seconds above 10
    }
}

function startTimer() { // when called, call timerSetUp every 10ms
    interval = setInterval(() => timerSetUp(), 10); // set the timer as the intervalID
}

function resetTimer(){ // when called, stop the timer and restart it after 800ms
    clearInterval(interval); // stop the timer
    tens = 0; // reset tens
    seconds = 0; // reset seconds
    tensEl.innerHTML = "O"; // reset html elements content
    secondsEl.innerHTML = "O";
    setTimeout(() => startTimer(), 800); // restart timer after 800ms
}

startTimer(); // call the stopwatch when the game starts

