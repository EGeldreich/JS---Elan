const squares = document.querySelectorAll('.square');
const container = document.querySelector('.container');

squares.forEach((square) => { // for each of the .square element
    square.addEventListener('click', () => { // add a click listener
        
        if(square.classList.contains("active")) { // if the box is already active
            square.classList.remove("active"); // remove active class
            container.style.backgroundColor = "#708090"; // set bg color to gray

        } else { // else (ie if the box is not active)
            squares.forEach(s => s.classList.remove("active")); // remove any active class
            square.classList.add("active"); // add active class to current box
            container.style.backgroundColor = square.dataset.color; // set proper bg color
        }
    })
});


