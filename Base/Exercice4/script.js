const squares = document.querySelectorAll('.square');
const container = document.querySelector('.container');

squares.forEach((square) => { // for each of the .square element
    square.addEventListener('click', () => { // add a click listener
        
        squares.forEach((sq) => sq.classList.remove("clicked")); // remove any already clicked class

        if(container.classList[1] == undefined) { // If the container doesn't have color yet
                container.classList.add(square.classList[1]) // add the right color
                square.classList.add("clicked") // add the clicked class to the box

            } else if(container.classList[1] == square.classList[1]) { // if reclicking on the activated box
                container.classList.remove(square.classList[1]) // remove the color

            } else { // Else (ie if clicking on a second box while one is active)
                container.classList.remove(container.classList[1]) // remove current bg color
                container.classList.add(square.classList[1]) // add new color
                square.classList.add("clicked") // add clicked class
            }
    })
});


// works if the user is kind enough to deactivate each box before clicking the next

// squares.forEach((square) => { // for each of the .square element
//     square.addEventListener('click', () => { // add a click listener
 
//         container.classList.toggle(square.classList[1])
//         square.classList.toggle("clicked")
        
//     })
// });

