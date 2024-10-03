const display = document.getElementById("content");


const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Update the display with the button's text
        display.textContent = button.textContent;
    });
});