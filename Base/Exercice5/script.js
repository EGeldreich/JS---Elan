// ----- NECESSARY ELEMENTS
const templateEl = document.querySelector("#quote-template");
const quotesEl = document.querySelector(".quotes");
const resetEl = document.querySelector("button");

// ----- IMPORT QUOTES
import {quotes} from "./quotes.js";

// ----- GENERAL FUNCTIONS
// -- Fav icon handler
const heartHandler = (heart) => {
    heart.classList.toggle("active");
    heart.classList.toggle("fa-solid");
    heart.classList.toggle("fa-regular");
}

// ----- CREATE QUOTES
quotes.forEach(quote => {
    const newQuote = templateEl.content.cloneNode(true); // Clone the content of the html template

    // -- Name elements
    let title = newQuote.querySelector(".title"); 
    let content = newQuote.querySelector(".content");
    let author = newQuote.querySelector(".author");
    let fav = newQuote.querySelector(".fav");

    // -- Give proper content
    title.textContent = quote.title;
    content.textContent = quote.content;
    author.textContent = quote.author;

    // -- Add a class id(number)
    newQuote.querySelector(".quote").classList.add(`id${quote.id}`);

    // -- Eventlistener for a click on fav-icon -- Color change and localStorage
    fav.addEventListener('click', function() {
        heartHandler(fav); // Call the handler

        // get already created favorites item from local storage OR empty array
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []; 

        if (fav.classList.contains("active")){ // If active (ie if you're adding)
            favorites.push(quote.id); // add the quote id to favorites

        } else { // If not active (ie if you're deleting)
            let index = favorites.indexOf(quote.id); // get the index of the id
            favorites.splice(index, 1); // remove it
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));// Set the modified favorites array to localStorage
    });

    // -- Add the new quote in the quotes container
    quotesEl.appendChild(newQuote);
})

// ----- LOCALSTORAGE HANDLER FOR LOAD
const localStorageHandler = () => {
    // // get already created favorites item from local storage OR empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // If the array is not empty (ie there are already favorites)
    if (favorites.length > 0) {
        favorites.forEach(favorite => { // For each id
            let alreadyFaved = document.querySelector(`.id${favorite}`); // Get corresponding quote with the id(number) class
            let fav = alreadyFaved.querySelector(".fav"); // Select the fav-icon
            heartHandler(fav); // Handle correspondly
        })
    }
}

// ----- RESET BUTTON
resetEl.addEventListener('click', () => {
    let favorites = []; // Set favorites as empty array
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Set said empty array as localStorage item
    location.reload(); // Reload
})

window.addEventListener('DOMContentLoaded', localStorageHandler); // Call localStorageHandler on load