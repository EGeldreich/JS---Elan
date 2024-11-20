const square = document.querySelector('.square');
const squareStyles = window.getComputedStyle(square);

function callStyles(){
    let styleList = `Classe : ${square.classList.value}
    - Background color : ${squareStyles.getPropertyValue("background-color")}
    - Color : ${squareStyles.getPropertyValue("color")}
    - Height : ${squareStyles.getPropertyValue("height")}
    - Width : ${squareStyles.getPropertyValue("width")}
    - Display : ${squareStyles.getPropertyValue("display")}
    - Font : ${squareStyles.getPropertyValue("font")}`;

    return styleList
}

square.addEventListener('click', () => {
    alert(callStyles())
})