let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];


chrome.storage.sync.get("color", (data) => {
  let currentColor = data.color;

  // For each color we were provided…
  for (let buttonColor of presetButtonColors) {
    // …crate a button with that color…
    let button = document.createElement("button");
    button.dataset.color = buttonColor;
    button.style.backgroundColor = buttonColor;

    // …mark the currently selected color…
    if (buttonColor === currentColor) {
      button.classList.add(selectedClassName);
    }

    // …and register a listener for when that button is clicked
    button.addEventListener("click", (event) => {
      // Remove styling from the previously selected color
      let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
      );
      if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
      }

      // Mark the button as selected
      let color = event.target.dataset.color;
      event.target.classList.add(selectedClassName);
      chrome.storage.sync.set({ color });
    });
    page.appendChild(button);
  }
});