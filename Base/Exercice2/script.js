const squares = document.querySelectorAll('.square');
const finalSquare = document.querySelector('.final-square');

squares.forEach((square) => { // for each of the .square element
    square.addEventListener('click', () => { // add a click listener
        // stock the value of background-color
        let clickedBG = window.getComputedStyle(square).getPropertyValue("background-color");
        let clickedClass = square.classList; // get the class list

        finalSquare.innerText = clickedBG; // set the bg-color value as text of the last square

        finalSquare.classList.remove(finalSquare.classList[1]); // remove any potentially already added class ( in this case would always be 2nd)
        finalSquare.classList.add(clickedClass[1]); // add relevant class to change color (in this case would always be 2nd class)
    })
});