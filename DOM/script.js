//----- DOM ELEMENTS
const box = document.createElement("div"); // create new div
box.classList.add("box"); // add box class to the created div
const board = document.querySelector("#board"); // call the #board element
const timer = document.querySelector("#timer"); // call the timer element

//----- PROMPT
// let value = prompt("Combien de boites voulez-vous?");

//----- SHUFFLER
function shuffleChildren(parent) {
    let children = parent.children;
    let i = children.length, k , temp; // Initialize i as how many children board as, and k & temp as empty variables
    // Same as
    // let i = board.children.length;
    // let k;
    // let temp;
    while(--i > 0){ // Loop while i - 1 is positive
        k = Math.floor(Math.random() * (i+1)) // define K as a random number based on i
        temp = board.children[k] // temporary set board.children[k] as temp
        board.children[k] = board.children[i] // swap board.children[k] with board.children[i] (i starts at the end and comes at the beginning)
        board.appendChild(temp) // use the temporarily stocked board.children[k] and put it in #board
    }
}

shuffleChildren(board);

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

for(let i = 1; i <= 5; i++){
    let newBox = box.cloneNode(); // clone box div and set it as newBox
    newBox.innerText = i; // set the inner text as the current value of i
    board.appendChild(newBox); // put the clone with it's number in board

    newBox.addEventListener('click', function(){

        if(i == nb){ // if the box number is the next number to click
            newBox.classList.add('box-clicked'); // add the class
            setTimeout(() => shuffleChildren(board), 800);// reshuffle the boxes () => needed to wait the set time out

            if(nb == board.children.length){ // if it's the last box
                board.querySelectorAll(".box").forEach(function(box){
                    // box.classList.remove("box-clicked");
                    showReaction("success", box); // add success reaction to all boxes
                })
            }

            nb++; // increment nb

        } else if(i > nb){ // if clicking on a higher numbered box
            showReaction("error", newBox); // show the error reaction
            nb = 1; // reset counter
            board.querySelectorAll(".box-clicked").forEach(function(clicked){
                clicked.classList.remove("box-clicked");
            })
            setTimeout(() => shuffleChildren(board), 800);// reshuffle the boxes () => needed to wait the set time out

        } else { // Only case left, if the number is already clicked
            showReaction("notice", newBox); // show the notice reaction
        }
    });
}

//---- TIMER
let seconds = 00;
let tens = 00;