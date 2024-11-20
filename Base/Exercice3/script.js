const squares = document.querySelectorAll('.square');

// for each square on click toggle .clicked
squares.forEach((square) => { 
    square.addEventListener('click', () => {
        square.classList.toggle("clicked")
    })
});